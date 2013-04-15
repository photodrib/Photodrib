using Buddy;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Tiles_album_app_UploadPhoto : System.Web.UI.Page
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
        string filename = Request.Headers["FILE_NAME"];
        if (filename == null) return;
        string input;
        using (var sr = new StreamReader(Request.InputStream))
        {
            input = sr.ReadToEnd();
        }
        if (input == "") return;
        byte[] picture = System.Text.Encoding.Default.GetBytes(input);
        var getAlbum = buddyUser.PhotoAlbums.Get(albumID);
        getAlbum.Wait();
        if (getAlbum.IsCanceled || getAlbum.IsFaulted) return;
        PhotoAlbum album = getAlbum.Result;
        var upload = album.AddPicture(picture);
        upload.Wait();
        if (upload.IsCanceled || upload.IsFaulted) return;
        Response.Write(Json.Encode(upload.Result));
    }
}
