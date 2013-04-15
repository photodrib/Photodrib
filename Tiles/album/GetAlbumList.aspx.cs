using Buddy;
using Buddy.BuddyService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Tiles_album_GetAlbumList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            Response.Write("null");
            return;
        }
        int userID;
        try
        {
            userID = int.Parse(Request["id"]);
        }
        catch (Exception)
        {
            Response.Write("null");
            return;
        }
        BuddyServiceClient client = new BuddyServiceClient();
        client.Pictures_PhotoAlbum_GetListCompleted += (object sdr, Pictures_PhotoAlbum_GetListCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                Response.Write("null");
                return;
            }
            var albumList = evt.Result;
            Response.Write(Json.Encode(albumList));
        };
        client.Pictures_PhotoAlbum_GetListAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, userID.ToString());
    }
}
