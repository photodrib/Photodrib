using Buddy;
using System;
using System.Web;
using System.Web.Security;

public partial class Settings : System.Web.UI.Page
{
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

    protected void Save_Button_Click(object sender, EventArgs e)
    {
        var firstName = Request["firstname"];
        var lastname = Request["lastname"];
        var currentPassword = Request["current_password"];
        var newPassword = Request["new_password"];
        var confirmPassword = Request["confirm_password"];
        
        try
        {
            if (!string.IsNullOrEmpty(newPassword))
            {
                if (newPassword != confirmPassword)
                {
                    MessagePanel.Visible = true;
                    Message.Text = "Password and confirmation does not match.";
                    return;
                }

                if (!Membership.GetUser(Profile.UserName).ChangePassword(currentPassword, newPassword))
                {
                    MessagePanel.Visible = true;
                    Message.Text = "Invalid old password or new passwords are in invalid format.";
                    return;
                }
            }

            Profile.FirstName = firstName;
            Profile.LastName = lastname;
            Profile.Save();
            Response.Redirect("Breakout.aspx");
        }
        catch (Exception x)
        {
            MessagePanel.Visible = true;
            Message.Text = x.Message;
        }
    }
}
