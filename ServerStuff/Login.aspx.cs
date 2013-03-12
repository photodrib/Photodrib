﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using Buddy;
using System.Threading.Tasks;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void LoginButton_Click(object sender, EventArgs e)
    {
        const string APPNAME = "Photodrib", APPPASS = "16632580-C9B0-478A-BDA9-B17391A4F4DE";
        BuddyClient client = new BuddyClient(APPNAME, APPPASS);
        var username = Request["username"];
        var password = Request["password"];
        var rememberMe = Convert.ToBoolean(Request["remember"] == "on");
        Task<AuthenticatedUser> task = client.Login(username, password);
        if (task.IsCompleted)
        {
            AuthenticatedUser user = task.Result;
        }
        if (Membership.ValidateUser(username, password))
        {
            Response.Cookies.Add(FormsAuthentication.GetAuthCookie(username, rememberMe));
            Response.Redirect("Breakout.aspx");
        }
        else
        {
            MessagePanel.Visible = true;
            Message.Text = "Invalid username or password";
        }
    }
}