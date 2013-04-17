using Buddy;
using System;
using System.Collections.Generic;
using System.Web.Profile;
using System.Web.Security;

public partial class Signup : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
    }

    protected void Signup_Button_Click(object sender, EventArgs e)
    {
        Page.DataBind();
        var username = Request["username"];
        var password = Request["password"];
        var confirmPassword = Request["confirm_password"];
        var email = Request["email"];
        var firstName = Request["firstname"];
        var lastName = Request["lastname"];
        int gender;
        try
        {
            gender = int.Parse(Request["ctl00$body$gender"]);
        }
        catch (Exception)
        {
            gender = 0;
        }
        int age;
        try
        {
            age = int.Parse(Request["age"]);
        }
        catch (Exception)
        {
            age = 0;
        }
        int status;
        try
        {
            status = int.Parse(Request["ctl00$body$status"]);
        }
        catch
        {
            status = 0;
        }
        bool rememberMe;
        try
        {
            rememberMe = Request["remember"] == "on";
        }
        catch
        {
            rememberMe = false;
        }

        if (string.IsNullOrEmpty(password) || password != confirmPassword)
        {
            MessagePanel.Visible = true;
            Message.Text = "Password and confirmation does not match.";
            return;
        }

        try
        {
            var user = Membership.CreateUser(username, password, email);

            UserGender[] userGenderList = { UserGender.Male, UserGender.Female, UserGender.Any };
            UserGender userGender = userGenderList[gender];

            UserStatus[] userStatusList = { UserStatus.Single, UserStatus.Dating, UserStatus.Engaged,
                                          UserStatus.Married, UserStatus.Divorced, UserStatus.Widowed,
                                          UserStatus.OnTheProwl, UserStatus.Any };
            UserStatus userStatus = userStatusList[status];

            BuddyClient client = BuddyApplication.Create();
            string hashedPassword = HashString.GetHash(password, System.Security.Cryptography.SHA1.Create());
            var buddyResp = client.CreateUser(username, hashedPassword, userGender, age, email, userStatus);
            AuthenticatedUser buddyUser = null;
            try
            {
                buddyUser = buddyResp.Result;
            }
            catch (AggregateException x)
            {
                throw x.InnerException;
            }
            Session["buddyUser"] = buddyUser;
            UserProfile profile = (UserProfile)ProfileBase.Create(username);
            profile.FirstName = firstName;
            profile.LastName = lastName;
            profile.BuddyToken = buddyUser.Token;
            profile.BuddyUserID = buddyUser.ID;
            profile.Save();

            Response.Cookies.Add(FormsAuthentication.GetAuthCookie(username, rememberMe));
            Response.Redirect("Breakout.aspx");
        }
        catch (Exception x)
        {
            MessagePanel.Visible = true;
            Message.Text = x.Message;
        }
    }

    private void CreateUserCallback(AuthenticatedUser buddyUser, BuddyCallbackParams callbackParams)
    {
        object[] state = (object[])callbackParams.State;
        if (callbackParams.AsyncResult.IsCompleted)
        {
            state[0] = buddyUser;
        }
        else
        {
            state[0] = callbackParams.Exception;
        }
    }

    protected void gender_Load(object sender, EventArgs e)
    {
        KeyValuePair<int, string>[] genderList = { new KeyValuePair<int, string>(0, "Secret"),
                                               new KeyValuePair<int, string>(1, "Male"),
                                               new KeyValuePair<int, string>(2, "Female") };
        gender.DataSource = genderList;
        gender.DataTextField = "Value";
        gender.DataValueField = "Key";
        gender.DataBind();
        gender.SelectedIndex = int.Parse(Request["ctl00$body$gender"] ?? "0");
    }

    protected void status_Load(object sender, EventArgs e)
    {
        KeyValuePair<int, string>[] statusList = { new KeyValuePair<int, string>(0, "Secret"),
                                                 new KeyValuePair<int, string>(1, "Single"),
                                                 new KeyValuePair<int, string>(2, "Dating"),
                                                 new KeyValuePair<int, string>(3, "Engaged"),
                                                 new KeyValuePair<int, string>(4, "Married"),
                                                 new KeyValuePair<int, string>(5, "Divorced"),
                                                 new KeyValuePair<int, string>(6, "Widowed"),
                                                 new KeyValuePair<int, string>(7, "On the Prowl")};
        status.DataSource = statusList;
        status.DataTextField = "Value";
        status.DataValueField = "Key";
        status.DataBind();
        status.SelectedIndex = int.Parse(Request["ctl00$body$status"] ?? "0");
    }
}
