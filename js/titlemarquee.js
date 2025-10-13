function step() {
    if (marqright) {
        marqtit = marqtit.substr(-1) + marqtit.substr(0, marqtit.length -1);
    } else {
        marqtit = marqtit.substr(1) + marqtit.substr(0,1);
    }
document.title = marqtit.substr(0,20);}setInterval(step,marqspeed)