﻿using Buddy.BuddyService;
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
            }
            catch (Exception)
            {
                continue;
            }
            var getAlbum = buddyUser.PhotoAlbums.Get(albumID);
            getAlbum.Wait();
            if (getAlbum.IsCanceled || getAlbum.IsFaulted)
            {
                continue;
            }
            PhotoAlbum album = getAlbum.Result;

            var delete = album.Delete();
            delete.Wait();
            if (delete.IsCanceled || delete.IsFaulted)
            {
                continue;
            }
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
        int userID;
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
                cells[1].InnerText = album.PhotoAlbumName;
                cells[2].InnerText = album.PhotoCount;
                row = new HtmlTableRow();
                foreach (HtmlTableCell cell in cells)
                {
                    row.Cells.Add(cell);
                }
                AlbumTable.Rows.Add(row);
            }
        };
        client.Pictures_PhotoAlbum_GetListAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, );
    }
}