<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CreateAlbum.aspx.cs" Inherits="Tiles_album_CreateAlbum" MasterPageFile="ServerStuff.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">
    Create Album
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <!-- Copyright 2012 Omar AL Zabir -->
    <div id="body">
        <div class="container metro">
            <form class="metro-form" runat="server" id="AlbumForm">
                <div class="metro-form-control" style="width: 300px">
                    <label>Album Name</label>
                    <div class="metro-text-box">
                        <input name="name" type="text" autofocus />
                        <span class="helper"></span>
                    </div>
                </div>

                <label class="metro-check">
                    <input type="checkbox" name="private" />
                    <span>Private</span>
                </label>
                <asp:Button ID="CreateAlbumButton" OnClick="CreateAlbumButton_Click" runat="server" CssClass="metro-button" Text="Create Album" />
            </form>

            <asp:Panel ID="MessagePanel" runat="server" Visible="false">
                <span ID="MessageTitle" class="" runat="server"></span>
                <asp:Label ID="Message" runat="server" />
            </asp:Panel>
        </div>
        
    </div>
</asp:Content>
