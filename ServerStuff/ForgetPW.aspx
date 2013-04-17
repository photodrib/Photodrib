<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ForgetPW.aspx.cs" Inherits="ForgetPW" MasterPageFile="ServerStuff.master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">
    Login
</asp:Content>
<asp:Content ContentPlaceHolderID="body" runat="server">
    <div id="body">
        <div class="container metro">

            <form class="metro-form" runat="server" id="ResetPWForm">
                <div class="metro-form-control" style="width: 300px">
                    <label>Username</label>
                    <div class="metro-text-box">
                        <input name="username" type="text" autofocus value="<%= Request["username"] ?? "" %>" />
                        <span class="helper"></span>
                    </div>
                </div>

                <asp:Panel ID="MessagePanel" runat="server" Visible="false">
                    <span ID="MessageTitle" class="" runat="server"></span>
                    <asp:Label ID="Message" runat="server" />
                </asp:Panel>

                <asp:Button ID="resetPW" OnClick="resetPW_Click" runat="server" CssClass="metro-button" Text="Reset the password" />
            </form>
        </div>
        
    </div>
</asp:Content>

