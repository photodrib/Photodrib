<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Signup.aspx.cs" Inherits="Signup" MasterPageFile="ServerStuff.master" Trace="true" %>
<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">
    Signup
</asp:Content>
<asp:Content ContentPlaceHolderID="body" runat="server">
    <!-- Copyright 2012 Omar AL Zabir -->
    <div id="body">
        <div class="container metro">
            <form class="metro-form" runat="server" id="LoginForm">
                <div class="metro-form-control" style="width: 300px">
                    <label>Username</label>
                    <div class="metro-text-box">
                        <input name="username" type="text" autofocus value="<%= Request["username"] ?? "" %>" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>Password</label>
                    <div class="metro-text-box">
                        <input name="password" type="password" value="" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>Confirm Password</label>
                    <div class="metro-text-box">
                        <input name="confirm_password" type="password" value="" />
                        <span class="helper"></span>
                    </div>
                </div>
                
                <div class="metro-form-control" style="width: 300px">
                    <label>Email</label>
                    <div class="metro-text-box">
                        <input name="email" type="email" value="<%= Request["email"] ?? "" %>" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>First name</label>
                    <div class="metro-text-box">
                        <input name="firstname" type="text" value="<%= Request["firstname"] ?? "" %>" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>Last name</label>
                    <div class="metro-text-box">
                        <input name="lastname" type="text" value="<%= Request["lastname"] ?? "" %>" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>Gender</label>
                    <div class="metro-select">
                        <asp:DropDownList ID="gender" OnLoad="gender_Load" runat="server" />
                    </div>
                    <span class="helper"></span>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>Age</label>
                    <div class="metro-text-box">
                        <input name="age" type="number" min="0" max="120" value="<%= Request["age"] ?? "" %>" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>Status</label>
                    <div class="metro-select">
                        <asp:DropDownList ID="status" OnLoad="status_Load" runat="server" />
                    </div>
                    <span class="helper"></span>
                </div>

                <label class="metro-check">
                    <input type="checkbox" name="remember" checked>
                    <span>Remember Me</span>
                </label>

                <asp:Panel ID="MessagePanel" runat="server" Visible="false">
                    <span class="label label-important">Error</span>
                    <asp:Label ID="Message" runat="server" />
                </asp:Panel>
                    
                <asp:Button ID="Signup_Button" OnClick="Signup_Button_Click" runat="server" CssClass="metro-button" Text="Signup" />
            
            </form>    
        </div>
        
    </div>
</asp:Content>
