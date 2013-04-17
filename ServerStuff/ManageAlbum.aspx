<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ManageAlbum.aspx.cs" Inherits="ServerStuff_ManageAlbum" MasterPageFile="ServerStuff.master" Async="true" %>
<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">
    Settings
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
<!-- Copyright 2012 Omar AL Zabir -->
    <div id="body">
        <div class="container metro">
            <form class="metro-form" runat="server" id="LoginForm">
                <table id="AlbumTable" onload="AlbumTable_Load" runat="server">
                    <tr>
                        <th></th>
                        <th>AlbumName</th>
                        <th>PhotoCount</th>
                    </tr>
                </table>
                <asp:Button ID="DeleteButton" OnClick="DeleteButton_Click" runat="server" CssClass="metro-button" Text="Delete" />
            </form>
        </div>
    </div>
</asp:Content>