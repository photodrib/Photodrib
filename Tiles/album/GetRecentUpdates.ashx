<%@ WebHandler Language="C#" Class="GetRecentUpdates" %>

using Buddy;
using Buddy.BuddyService;
using System;
using System.Web;
using System.Web.Helpers;
using System.Web.SessionState;

public class GetRecentUpdates : IHttpHandler, IRequiresSessionState {

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
        BuddyServiceClient client = new BuddyServiceClient();
        client.Pictures_VirtualAlbum_GetCompleted += (object sender, Pictures_VirtualAlbum_GetCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                context.Response.Write("null");
                return;
            }
            var album = evt.Result;
            context.Response.Write(Json.Encode(album));
        };
        client.Pictures_VirtualAlbum_GetAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, BuddyApplication.SUPERTOKEN, BuddyApplication.RUID.ToString());
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}