﻿<%@ WebHandler Language="C#" Class="Logout" %>
// Copyright 2012 Omar AL Zabir
using System;
using System.Web;
using System.Collections.Generic;
using System.Web.SessionState;

public class Logout : IHttpHandler, IRequiresSessionState {
    
    public void ProcessRequest (HttpContext context) {
        List<string> cookiesToClear = new List<string>();
        foreach (string cookieName in context.Request.Cookies)
        {
            HttpCookie cookie = context.Request.Cookies[cookieName];
            cookiesToClear.Add(cookie.Name);
        }

        foreach (string name in cookiesToClear)
        {
            HttpCookie cookie = new HttpCookie(name, string.Empty);
            cookie.Expires = DateTime.Today.AddYears(-1);

            context.Response.Cookies.Set(cookie);
        }
        context.Session["buddyUser"] = null;

        System.Web.Security.FormsAuthentication.SignOut();
        context.Response.Redirect("Breakout.aspx");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}
