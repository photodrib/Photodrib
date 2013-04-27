using Buddy;
using System;
using System.Web;
using System.Web.Security;

public partial class Settings : System.Web.UI.Page
{
    // load the page
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
    // handle the save button clicked 
    protected void Save_Button_Click(object sender, EventArgs e)
    {
        // generate the request to the buddy server
        AuthenticatedUser buddyUser = Session["buddyUser"] as AuthenticatedUser;
        if (buddyUser == null) return;
        var firstName = Request["firstname"];
        var lastname = Request["lastname"];
        var currentPassword = Request["current_password"];
        var newPassword = Request["new_password"];
        var confirmPassword = Request["confirm_password"];
        // check the sign in info
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
                string hashedPassword = HashString.GetHash(newPassword, System.Security.Cryptography.SHA1.Create());
                var task = buddyUser.Update(password: hashedPassword);
                task.Wait();
                if (task.IsCanceled || task.IsFaulted || !task.Result || !Membership.GetUser(Profile.UserName).ChangePassword(currentPassword, newPassword))
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
