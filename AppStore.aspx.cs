using Buddy;
using System;
using System.Web;

public partial class Tiles_AppStore : System.Web.UI.Page
{
    // connect to the buddy when loading the page
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Profile.IsAnonymous)
        {
            Response.Cookies.Add(new HttpCookie("p", Profile.Tiles)
            {
                Expires = DateTime.Now.AddDays(30)
            });
            if (Session["buddyUser"] == null)
            {
                BuddyClient client = BuddyApplication.Create();
                var task = client.Login(Profile.BuddyToken);
                task.Wait();
                if (!task.IsCanceled && !task.IsFaulted)
                {
                    Session["buddyUser"] = task.Result;
                }
            }
        }
    }
}
