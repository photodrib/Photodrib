using Buddy.BuddyService;
using Buddy;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Security;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Linq;
using System.Web.Helpers;
using System.Web.UI;

public partial class ServerStuff_ManageAlbum : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        if (!Profile.IsAnonymous)
        {
            Response.Cookies.Add(new HttpCookie("p", Profile.Tiles)
            {
                Expires = DateTime.Now.AddDays(30)
            });
            if (Session["buddyUser"] == null)
            {
                BuddyClient client = BuddyApplication.Create();
                var task = client.Login(Profile.BuddyToken);
                task.Wait();
                if (!task.IsCanceled && !task.IsFaulted)
                {
                    Session["buddyUser"] = task.Result;
                }
            }
        }
    }

    protected void DeleteButton_Click(object sender, EventArgs e)
    {
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        
        if (buddyUser == null)
        {
            return;
        }
        string[] del = Request["del"].Split(',');
        Hashtable albums = new Hashtable();
        foreach (string s in del)
        {
            int albumID;
            try
            {
                albumID = int.Parse(s);
                Response.Write(albumID);
                Response.Write("\n");
            }
            catch (Exception)
            {
                continue;
            }
            BuddyServiceClient client = new BuddyServiceClient();
            client.Pictures_PhotoAlbum_DeleteCompleted += (object sdr, Pictures_PhotoAlbum_DeleteCompletedEventArgs evt) =>
            {
            };
            
            client.Pictures_PhotoAlbum_DeleteAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, albumID.ToString());

        }
        Response.Redirect("ManageAlbum.aspx", true);
    }

    protected void AlbumTable_Load(object sender, EventArgs e)
    {
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            return;
        }
        int userID = buddyUser.ID;
        BuddyServiceClient client = new BuddyServiceClient();
        client.Pictures_PhotoAlbum_GetListCompleted += (object sdr, Pictures_PhotoAlbum_GetListCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                return;
            }
            var albumList = evt.Result;
            HtmlTableCell[] cells = new HtmlTableCell[3];
            HtmlTableRow row;
            foreach (var album in albumList)
            {
                for (int i = 0; i < cells.Length; i++)
                {
                    cells[i] = new HtmlTableCell();
                }
                cells[0].InnerHtml = "<input type=\"checkbox\" name=\"del\" value=\"" + album.AlbumID + "\" />";
                cells[1].InnerHtml = "<a href=\"../Tiles/album/app/AlbumApp.html?aid=" + album.AlbumID + "&uid=" + userID + "\">" + album.PhotoAlbumName + "</a>";
                cells[2].InnerText = album.PhotoCount;
                row = new HtmlTableRow();
                foreach (HtmlTableCell cell in cells)
                {
                    row.Cells.Add(cell);
                }
                AlbumTable.Rows.Add(row);
            }
        };
        client.Pictures_PhotoAlbum_GetListAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, userID.ToString());
    }
}