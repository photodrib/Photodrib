using Buddy;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ServerStuff_DeleteAlbum : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        Response.ContentType = "text/plain";
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            Response.Write("null");
            return;
        }
        int albumID;
        try
        {
            albumID = int.Parse(Request["id"]);
        }
        catch (Exception)
        {
            Response.Write("null");
            return;
        }

        var getAlbum = buddyUser.PhotoAlbums.Get(albumID);
        getAlbum.Wait();
        if (getAlbum.IsCanceled || getAlbum.IsFaulted)
        {
            Response.Write("null");
            return;
        }
        PhotoAlbum album = getAlbum.Result;

        var delete = album.Delete();
        delete.Wait();
        if (delete.IsCanceled || delete.IsFaulted)
        {
            Response.Write("null");
            return;
        }
        Response.Write(Json.Encode(delete.Result));
    }


}