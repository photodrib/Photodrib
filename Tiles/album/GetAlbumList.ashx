<%@ WebHandler Language="C#" Class="GetAlbumList" %>

using Buddy;
using Buddy.BuddyService;
using System;
using System.Web;
using System.Web.Helpers;
using System.Web.SessionState;

public class GetAlbumList : IHttpHandler, IRequiresSessionState {

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
        int userID;
        try
        {
            userID = int.Parse(context.Request["id"]);
        }
        catch (Exception)
        {
            context.Response.Write("null");
            return;
        }
        BuddyServiceClient client = new BuddyServiceClient();
        client.Pictures_PhotoAlbum_GetListCompleted += (object sdr, Pictures_PhotoAlbum_GetListCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                context.Response.Write("null");
                return;
            }
            var albumList = evt.Result;
            context.Response.Write(Json.Encode(albumList));
        };
        client.Pictures_PhotoAlbum_GetListAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, userID.ToString());
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}