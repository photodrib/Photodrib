﻿using Buddy;
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
        string filename = Request.Headers["FILE_NAME"];
        if (filename == null)
        {
            Response.Write("null");
            return;
        }
        string input;
        using (var sr = new StreamReader(Request.InputStream))
        {
            input = sr.ReadToEnd();
        }
        if (input == "")
        {
            Response.Write("null");
            return;
        }
        byte[] picture = Convert.FromBase64String(input);
        var getAlbum = buddyUser.PhotoAlbums.Get(albumID);
        getAlbum.Wait();
        if (getAlbum.IsCanceled || getAlbum.IsFaulted)
        {
            Response.Write("null");
            return;
        }
        PhotoAlbum album = getAlbum.Result;
        var upload = album.AddPicture(picture);
        upload.Wait();
        if (upload.IsCanceled || upload.IsFaulted)
        {
            Response.Write("null");
            return;
        }
        Response.Write(Json.Encode(upload.Result));
    }
}
