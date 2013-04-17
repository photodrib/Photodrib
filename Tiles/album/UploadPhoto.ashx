<%@ WebHandler Language="C#" Class="UploadPhoto" %>

using Buddy;
using System;
using System.IO;
using System.Web;
using System.Web.Helpers;
using System.Web.SessionState;

public class UploadPhoto : IHttpHandler, IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        context.Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        context.Response.ContentType = "text/plain";
        AuthenticatedUser buddyUser = context.Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            context.Response.Write("null");
            return;
        }
        int albumID;
        try
        {
            albumID = int.Parse(context.Request["id"]);
        }
        catch (Exception)
        {
            context.Response.Write("null");
            return;
        }
        double lat;
        try
        {
            lat = double.Parse(context.Request["lat"]);
        }
        catch (Exception)
        {
            lat = 0;
        }
        double lng;
        try
        {
            lng = double.Parse(context.Request["lng"]);
        }
        catch (Exception)
        {
            lng = 0;
        }
        string filename = context.Request.Headers["FILE_NAME"];
        if (filename == null)
        {
            context.Response.Write("null");
            return;
        }
        string input;
        using (var sr = new StreamReader(context.Request.InputStream))
        {
            input = sr.ReadToEnd();
        }
        if (input == "")
        {
            context.Response.Write("null");
            return;
        }
        byte[] picture = Convert.FromBase64String(input);
        var getAlbum = buddyUser.PhotoAlbums.Get(albumID);
        getAlbum.Wait();
        if (getAlbum.IsCanceled || getAlbum.IsFaulted)
        {
            context.Response.Write("null");
            return;
        }
        PhotoAlbum album = getAlbum.Result;
        var upload = album.AddPicture(picture, filename, lat, lng);
        upload.Wait();
        if (upload.IsCanceled || upload.IsFaulted)
        {
            context.Response.Write("null");
            return;
        }
        context.Response.Write(Json.Encode(upload.Result));
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}