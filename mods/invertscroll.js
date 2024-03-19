runAfterLoad(function() {
    if (settings.invertscroll === undefined && navigator.platform.toUpperCase().indexOf('MAC')>=0) {
        settings.invertscroll = false;
    }
    else {
        settings.invertscroll = true;
    }
})
