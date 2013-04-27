<%@ WebHandler Language="C#" Class="GetRecentUpdatesInfo" %>

using Buddy;
using Buddy.BuddyService;
using System;
using System.Web;
using System.Web.Helpers;
using System.Web.SessionState;

public class GetRecentUpdatesInfo : IHttpHandler, IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        //Get the information of the virtual album of the recent updates
        //Output as a JSON object of the information of the virtual album of the recent updates
        context.Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        context.Response.ContentType = "text/plain";
        AuthenticatedUser buddyUser = context.Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            context.Response.Write("null");
            return;
        }
        BuddyServiceClient client = new BuddyServiceClient();
        client.Pictures_VirtualAlbum_GetAlbumInformationCompleted += (object sender, Pictures_VirtualAlbum_GetAlbumInformationCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                context.Response.Write("null");
                return;
            }
            var album = evt.Result;
            context.Response.Write(Json.Encode(album[0]));
        };
        client.Pictures_VirtualAlbum_GetAlbumInformationAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, BuddyApplication.SUPERTOKEN, BuddyApplication.RUID.ToString(), null);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}