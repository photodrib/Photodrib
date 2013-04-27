<%@ WebHandler Language="C#" Class="DeleteAlbum" %>

using Buddy;
using System;
using System.Web;
using System.Web.Helpers;
using System.Web.SessionState;

public class DeleteAlbum : IHttpHandler, IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        //Delete the whole album of the user currently logged in given the album ID
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

        var getAlbum = buddyUser.PhotoAlbums.Get(albumID);
        getAlbum.Wait();
        if (getAlbum.IsCanceled || getAlbum.IsFaulted)
        {
            context.Response.Write("null");
            return;
        }
        PhotoAlbum album = getAlbum.Result;
        if (album == null)
        {
            context.Response.Write("null");
            return;
        }

        var delete = album.Delete();
        try
        {
            delete.Wait();
        }
        catch (Exception)
        {
            context.Response.Write("null");
            return;
        }
        if (delete.IsCanceled || delete.IsFaulted)
        {
            context.Response.Write("null");
            return;
        }
        context.Response.Write(Json.Encode(delete.Result));
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}