using Buddy;
using Buddy.BuddyService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ServerStuff_GetUserID : System.Web.UI.Page
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
        BuddyServiceClient client = new BuddyServiceClient();
        client.UserAccount_Profile_GetUserIDFromUserTokenCompleted += (object sdr, UserAccount_Profile_GetUserIDFromUserTokenCompletedEventArgs evt) =>
        {
            if (evt.Cancelled)
            {
                Response.Write("null");
                return;
            }
            int uid = int.Parse(evt.Result);
            Response.Write(Json.Encode(uid));
        };
        client.UserAccount_Profile_GetUserIDFromUserTokenAsync(BuddyApplication.APPNAME, BuddyApplication.APPPASS, buddyUser.Token, null);
    }
}
