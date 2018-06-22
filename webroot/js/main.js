var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "cigars"	    : "cigarList",
        "cigars/page/:page" : "cigarList",
        "cigars/add"        : "addCigar",
        "cigars/:id"        : "cigarDetails",
        "wines"	    	    : "wineList",
        "wines/page/:page"  : "wineList",
        "wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	cigarList: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var cigarList = new CigarCollection();
        cigarList.fetch({success: function(){
            $("#content").html(new CigarListView({model: cigarList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

	wineList: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    cigarDetails: function (id) {
        var cigar = new Cigar({_id: id});
        cigar.fetch({success: function(){
            $("#content").html(new CigarView({model: cigar}).el);
        }});
        this.headerView.selectMenuItem();
    },

    wineDetails: function (id) {
        var wine = new Wine({_id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addCigar: function() {
        var cigar = new Cigar();
        $('#content').html(new CigarView({model: cigar}).el);
        this.headerView.selectMenuItem('add-menu');
	},

	addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'CigarView', 'CigarListItemView', 'WineView', 'WineListItemView','AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
