using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Buddy;
using System.Web.Helpers;
using Buddy.BuddyService;

public partial class Tiles_album_GetAlbum : System.Web.UI.Page
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
        int albumID;
        try
        {
            albumID = int.Parse(Request["aid"]);
        }
        catch (Exception)
        {
            Response.Write("null");
            return;
        }
        int uid;
        try
        {
            uid = int.Parse(Request["uid"]);
        }
        catch (Exception)
        {
            Response.Write("null");
            return;
        }
        BuddyServiceClient client = new BuddyServiceClient();
        client.Pictures_PhotoAlbum_GetCompleted += (object sdr, Pictures_PhotoAlbum_GetCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                Response.Write("null");
                return;
            }
            var album = evt.Result;
            Response.Write(Json.Encode(album));
        };
        client.Pictures_PhotoAlbum_GetAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, uid.ToString(), albumID.ToString());
        //Response.Write(Json.Encode(album).Replace(",\"Pictures\":[]", ""));
    }
}