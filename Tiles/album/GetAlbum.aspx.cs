using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Buddy;
using System.Web.Helpers;

public partial class Tiles_album_GetAlbum : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null) return;
        int albumID;
        try
        {
            albumID = int.Parse(Request["id"]);
        }
        catch (Exception)
        {
            return;
        }
        var task = buddyUser.PhotoAlbums.Get(albumID);
        try
        {
            task.Wait();
        }
        catch (Exception)
        {
            return;
        }
        if (task.IsCanceled || task.IsFaulted) return;
        var album = task.Result;
        Response.Write(Json.Encode(album));
    }
}