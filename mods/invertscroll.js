runAfterLoad(function() {
    if (navigator.platform.toUpperCase().indexOf('MAC')>=0) {
        settings.invertscroll = false;
    }
    else {
        settings.invertscroll = true;
    }
})
