using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.UI;
using System.Web.UI.WebControls;
using Buddy;
using Buddy.BuddyService;

public partial class Tiles_album_GetPhoto : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        Response.ContentType = "text/plain";
        int pid;
        try
        {
            pid = int.Parse(Request["pid"]);
        }
        catch (Exception)
        {
            Response.Write("null");
            return;
        }
        int uid;
        try
        {
            uid = int.Parse(Request["uid"]);
        }
        catch (Exception)
        {
            Response.Write("null");
            return;
        }
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null)
        {
            Response.Write("null");
            return;
        }
        BuddyServiceClient client = new BuddyServiceClient();
        client.Pictures_Photo_GetCompleted += (object sdr, Pictures_Photo_GetCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                Response.Write("null");
                return;
            }
            var pic = evt.Result;
            Response.Write(Json.Encode(pic[0]));
        };
        client.Pictures_Photo_GetAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, uid.ToString(), pid.ToString());
    }
}