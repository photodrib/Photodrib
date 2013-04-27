<%@ WebHandler Language="C#" Class="GetAlbum" %>

using Buddy;
using Buddy.BuddyService;
using System;
using System.Web;
using System.Web.Helpers;
using System.Web.SessionState;

public class GetAlbum : IHttpHandler, IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        //Get the album given the owner's user ID and the album ID
        //Output as a JSON object of the album information
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
            albumID = int.Parse(context.Request["aid"]);
        }
        catch (Exception)
        {
            context.Response.Write("null");
            return;
        }
        int uid;
        try
        {
            uid = int.Parse(context.Request["uid"]);
        }
        catch (Exception)
        {
            context.Response.Write("null");
            return;
        }
        BuddyServiceClient client = new BuddyServiceClient();
        client.Pictures_PhotoAlbum_GetCompleted += (object sdr, Pictures_PhotoAlbum_GetCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                context.Response.Write("null");
                return;
            }
            var album = evt.Result;
            context.Response.Write(Json.Encode(album));
        };
        client.Pictures_PhotoAlbum_GetAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, uid.ToString(), albumID.ToString());
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}