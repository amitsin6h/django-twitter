define("app/ui/signup/signup_call_out_expander",["module","require","exports","core/component","app/data/with_scribe"],function(module, require, exports) {
function signupCallOutExpander(){this.defaultAttrs({expandButtonSelector:".SignupCallOut-expand",formSelector:".SignupForm"}),this.expandForm=function(){this.select("formSelector").slideDown(),this.select("expandButtonSelector").slideUp(),this.scribe({element:"signup_call_out_expand",action:"click"})},this.after("initialize",function(a){this.on("click",{expandButtonSelector:this.expandForm})})}var defineComponent=require("core/component"),withScribe=require("app/data/with_scribe");module.exports=defineComponent(signupCallOutExpander,withScribe)
});
define("app/ui/streams/stream_hero_buttons",["module","require","exports","core/component"],function(module, require, exports) {
function streamHeroButtons(){this.defaultAttrs({loginButtonSelector:".js-login"}),this.loginClicked=function(a,b){a.preventDefault(),this.trigger("uiOpenLoginDialog")},this.after("initialize",function(){this.on("click",{loginButtonSelector:this.loginClicked})})}var defineComponent=require("core/component");module.exports=defineComponent(streamHeroButtons)
});
define("app/utils/moments/moments_scribe_util",["module","require","exports"],function(module, require, exports) {
var MomentsScribeUtil={scribeData:function(a){return{items:[{moments_details:a}]}},getClosestAttr:function(a,b){return a.closest("["+b+"]").attr(b)}};module.exports=MomentsScribeUtil
});
define("app/ui/moments/with_moment_scribe_data",["module","require","exports","core/utils","app/utils/moments/moments_scribe_util"],function(module, require, exports) {
function withMomentScribeData(){this.getMomentScribeData=function(a){var b={impression_id:MomentsScribeUtil.getClosestAttr(a,"data-guide-impression-id")},c={moment_id:MomentsScribeUtil.getClosestAttr(a,"data-moment-id")};return MomentsScribeUtil.scribeData(utils.merge(b,c))},this.getMomentScribeInfo=function(a){return{scribeData:this.getMomentScribeData(a),scribeContext:{component:MomentsScribeUtil.getClosestAttr(a,"data-component-context"),element:MomentsScribeUtil.getClosestAttr(a,"data-element-context")}}}}var utils=require("core/utils"),MomentsScribeUtil=require("app/utils/moments/moments_scribe_util");module.exports=withMomentScribeData
});
define("app/ui/moments/moment_capsule_summary",["module","require","exports","core/component","app/ui/moments/with_moment_scribe_data"],function(module, require, exports) {
function momentCapsuleSummary(){this.defaultAttrs({itemSelector:".MomentGuideVTwoCapsuleSummary",defaultLinkSelector:".js-default-link"}),this.navigateToCapsule=function(a,b){if(!this.isValidClickTarget(a))return;var c=$(b.el).closest(this.attr.itemSelector),d=c.find(this.attr.defaultLinkSelector);this.trigger("uiMomentClicked",this.getMomentScribeInfo(c)),this.trigger("uiNavigate",{href:d.attr("href")})},this.onDefaultLinkClick=function(a,b){var c=$(a.target);this.trigger("uiMomentClicked",this.getMomentScribeInfo(c))},this.isValidClickTarget=function(a){return $(a.target).closest("a, button").length==0},this.after("initialize",function(){this.on("click",{itemSelector:this.navigateToCapsule,defaultLinkSelector:this.onDefaultLinkClick})})}var defineComponent=require("core/component"),withMomentScribeData=require("app/ui/moments/with_moment_scribe_data");module.exports=defineComponent(momentCapsuleSummary,withMomentScribeData)
});
define("app/data/moments/moment_capsule_scribe",["module","require","exports","core/component","app/data/with_scribe"],function(module, require, exports) {
function momentCapsuleScribe(){this.after("initialize",function(){this.scribeOnEvent("uiMomentClicked",{action:"click"}),this.scribeOnEvent("uiFollowMoment",{action:"follow"}),this.scribeOnEvent("uiUnfollowMoment",{action:"unfollow"})})}var defineComponent=require("core/component"),withScribe=require("app/data/with_scribe");module.exports=defineComponent(momentCapsuleScribe,withScribe)
});
define("app/boot/streams",["module","require","exports","app/boot/logged_out","app/boot/app","app/data/client_event","app/utils/cookie","app/ui/dynamic_card_watcher","app/ui/login_form","app/ui/signin_dropdown","app/ui/navigation_links","app/ui/gallery/gallery","app/data/gallery_scribe","app/ui/playable_media/playable_media_manager","app/ui/responsive_dashboard_width","app/ui/scroll_monitor","app/ui/tweet_actions","app/ui/dialogs/uz_survey","app/ui/signup/signup_call_out_expander","app/ui/streams/stream_hero_buttons","app/data/user_info","app/ui/multiline_ellipses","app/ui/moments/media_loader","app/ui/moments/moment_capsule_summary","app/data/moments/moment_capsule_scribe"],function(module, require, exports) {
var bootLoggedOut=require("app/boot/logged_out"),bootLoggedIn=require("app/boot/app"),clientEvent=require("app/data/client_event"),cookie=require("app/utils/cookie"),DynamicCardWatcher=require("app/ui/dynamic_card_watcher"),LoginForm=require("app/ui/login_form"),SigninDropdown=require("app/ui/signin_dropdown"),NavigationLinks=require("app/ui/navigation_links"),Gallery=require("app/ui/gallery/gallery"),GalleryScribe=require("app/data/gallery_scribe"),PlayableMediaManager=require("app/ui/playable_media/playable_media_manager"),ResponsiveDashboardWidth=require("app/ui/responsive_dashboard_width"),ScrollMonitor=require("app/ui/scroll_monitor"),TweetActions=require("app/ui/tweet_actions"),UzSurvey=require("app/ui/dialogs/uz_survey"),SignupCallOutExpander=require("app/ui/signup/signup_call_out_expander"),StreamHeroButtons=require("app/ui/streams/stream_hero_buttons"),userInfo=require("app/data/user_info"),MultilineEllipses=require("app/ui/multiline_ellipses"),MomentsMediaLoader=require("app/ui/moments/media_loader"),MomentCapsuleSummary=require("app/ui/moments/moment_capsule_summary"),MomentCapsuleScribe=require("app/data/moments/moment_capsule_scribe");module.exports=function(a){bootLoggedIn(a),a.loggedIn||bootLoggedOut(a),GalleryScribe.attachTo(document,{noTeardown:!0}),UzSurvey.attachTo("#uz_streams_survey");var b={itemType:"tweet",noTeardown:!0,loggedIn:a.loggedIn,eventData:{scribeContext:{component:"gallery"}}};Gallery.attachTo(".Gallery",a,b),TweetActions.attachTo(".Gallery",a,b),clientEvent.scribeData.context=a.streamId,SigninDropdown.attachTo(".js-session"),a.passwordResetAdvancedLoginForm&&LoginForm.attachTo(".js-front-signin"),StreamHeroButtons.attachTo(".StreamsHero-buttonContainer, .StreamsTopBar"),ResponsiveDashboardWidth.attachTo(document),SignupCallOutExpander.attachTo(".SignupCallOut"),ScrollMonitor.attachTo(document,{autoStart:!0,scrollDelay:10}),DynamicCardWatcher.attachTo(window,{containerSelector:"#timeline",unloadedCardsFilter:'[data-has-autoplayable-media="true"]'}),MultilineEllipses.attachTo(document);if(userInfo.getDecider("moments_lohp_enabled")){var c=".Streams-momentsContainer";MomentsMediaLoader.attachTo(c),MomentCapsuleSummary.attachTo(c),MomentCapsuleScribe.attachTo(document),NavigationLinks.attachTo(".Streams-momentsContainer",{eventData:{scribeContext:{component:"moments"}}})}PlayableMediaManager.attachTo("#timeline")}
});
define("app/ui/streams/with_column_timeline",["module","require","exports"],function(module, require, exports) {
function withColumnTimeline(){this.defaultAttrs({columnContainer:".Grid-cell",columnCount:3,alignmentDelta:500}),this.getItemsToInject=function(a){return a.children().children()},this.injectToDOM=function(a,b){for(var c=0;c<this.attr.columnCount;c++)this.columnSelector(c).append($(b[c]).children());for(c=0;c<this.attr.fetchedItemsCount;c++){var d=this.getMinMaxColumns(),e=d.min,f=d.max;if(f.height-e.height<this.attr.alignmentDelta)break;this.moveItemOver(f.index,e.index)}},this.columnSelector=function(a){return $(this.attr.columnContainer+":eq("+a+")")},this.getMinMaxColumns=function(){var a=max={index:0,height:this.columnSelector(0).height()};for(var b=1;b<this.attr.columnCount;b++)currentHeight=this.columnSelector(b).height(),currentHeight<a.height&&(a={index:b,height:currentHeight}),currentHeight>max.height&&(max={index:b,height:currentHeight});return{min:a,max:max}},this.moveItemOver=function(a,b){var c=this.columnSelector(a).children(),d=c.last();c.remove(d),this.columnSelector(b).append(d)}}module.exports=withColumnTimeline
});
define("app/boot/column_timeline",["module","require","exports","app/boot/timeline","app/boot/tweets","app/ui/streams/with_column_timeline","app/ui/timelines/tweet_timeline"],function(module, require, exports) {
function initialize(a){timelineBoot(a),tweetsBoot("#timeline",a),TweetTimeline.mixin.apply(this,[withColumnTimeline]).attachTo("#timeline",a)}var timelineBoot=require("app/boot/timeline"),tweetsBoot=require("app/boot/tweets"),withColumnTimeline=require("app/ui/streams/with_column_timeline"),TweetTimeline=require("app/ui/timelines/tweet_timeline");module.exports=initialize
});
define("app/ui/streams/stream_category_bar",["module","require","exports","core/component","app/ui/with_dropdown","app/data/with_scribe"],function(module, require, exports) {
function Nav(){this.defaultAttrs({searchItemSelector:".StreamsCategoryBar-item.ItemSearch",searchBarSelector:".StreamsTopBar-searchContainer",searchDismissSelector:".StreamsTopBar-searchDismiss",searchHiddenClass:"StreamsTopBar-searchContainerHidden",categoryBarSelector:".StreamsCategoryBar",scribeComponent:"category_bar",scribeElement:"search"}),this.showSearch=function(){this.scribe({component:this.attr.scribeComponent,element:this.attr.scribeElement,action:"show"}),this.select("categoryBarSelector").addClass("u-hidden"),this.select("categoryBarSelector").addClass("StreamsTopBar--invisible"),this.select("searchBarSelector").removeClass("u-hidden"),setTimeout(function(){this.select("searchBarSelector").removeClass("StreamsTopBar--invisible")}.bind(this))},this.hideSearch=function(){this.scribe({component:this.attr.scribeComponent,element:this.attr.scribeElement,action:"hide"}),this.select("searchBarSelector").addClass("u-hidden"),this.select("searchBarSelector").addClass("StreamsTopBar--invisible"),this.select("categoryBarSelector").removeClass("u-hidden"),setTimeout(function(){this.select("categoryBarSelector").removeClass("StreamsTopBar--invisible")}.bind(this))},this.after("initialize",function(){this.on("click",{searchItemSelector:this.showSearch,searchDismissSelector:this.hideSearch})})}var defineComponent=require("core/component"),withDropdown=require("app/ui/with_dropdown"),withScribe=require("app/data/with_scribe");module.exports=defineComponent(withDropdown,withScribe,Nav)
});
define("app/ui/cookie_warning",["module","require","exports","core/component"],function(module, require, exports) {
function cookieWarning(){this.cookiesEnabled=function(){var a=!!navigator.cookieEnabled;if(typeof navigator.cookieEnabled=="undefined"||$.browser.msie)document.cookie="cookies_enabled",a=document.cookie.indexOf("cookies_enabled")!=-1;return a},this.showWarning=function(){this.cookiesEnabled()||this.$node.show("fast")},this.after("initialize",function(){this.on(document,"uiSwiftLoaded",this.showWarning)})}var component=require("core/component");module.exports=component(cookieWarning)
});
define("app/ui/streams/tweet_forward_gifs",["module","require","exports","app/ui/expando/with_animated_gifs","core/component"],function(module, require, exports) {
function lohpGifPlayer(){this.defaultAttrs({tweetSelector:".js-stream-tweet",mediaGifSelector:".js-media-preview",animatedGifSelector:".animated-gif"}),this.handleGifClick=function(a,b){var c=$(b.el).closest(this.attr.tweetSelector),d=c.find(this.attr.mediaGifSelector);d.hasClass("is-playing")?(this.trigger(c,"uiStopGif"),d.removeClass("is-playing")):(this.trigger(c,"uiStartGif"),d.addClass("is-playing"))},this.after("initialize",function(){this.on("click",{mediaGifSelector:this.handleGifClick,animatedGifSelector:this.handleGifClick})})}var withAnimatedGifs=require("app/ui/expando/with_animated_gifs"),defineComponent=require("core/component");module.exports=defineComponent(lohpGifPlayer,withAnimatedGifs)
});
define("app/ui/media/media_preview",["module","require","exports","core/component","app/ui/with_card"],function(module, require, exports) {
function mediaPreview(){this.defaultAttrs({tweetSelector:".js-tweet",mediaPreviewSelector:".js-media-preview"}),this.loadCard=function(a,b){var c=$(b.el).closest(this.attr.tweetSelector);this.createCard(c)},this.once=function(a){return function(b,c){var d=$(c.el);if(d.data("clicked"))return;d.data("clicked",!0),a.call(this,b,c)}.bind(this)},this.after("initialize",function(a,b){this.on("click",{mediaPreviewSelector:this.once(this.loadCard)})})}var defineComponent=require("core/component"),withCard=require("app/ui/with_card");module.exports=defineComponent(mediaPreview,withCard)
});
define("app/ui/streams/element_scroll_affixer",["module","require","exports","core/component"],function(module, require, exports) {
function ElementScrollAffixer(){this.defaultAttrs({fixedClass:"StreamsTopBar--fixed",scrollThreshold:300}),this.handleScroll=function(a,b){!this.isFixed&&b.scrollTop>=this.attr.scrollThreshold?(this.$node.addClass(this.attr.fixedClass),this.isFixed=!0):this.isFixed&&b.scrollTop<this.attr.scrollThreshold&&(this.$node.removeClass(this.attr.fixedClass),this.isFixed=!1)},this.after("initialize",function(){this.isFixed=!1,this.handleScroll(null,{scrollTop:$(document).scrollTop()}),this.on(document,"uiElementHasScrolled",this.handleScroll)})}var defineComponent=require("core/component");module.exports=defineComponent(ElementScrollAffixer)
});
define("app/ui/streams/floating_footer",["module","require","exports","core/component"],function(module, require, exports) {
function FloatingFooter(){this.defaultAttrs({fixedClass:"StreamsFooter--fixed",slideClass:"StreamsFooter--slide"}),this.isOnScreen=function(a){var b=$(window).scrollTop(),c=$(a).offset().top;return c<$(window).height()+b&&c>b-$(a).height()},this.scrolledToBottom=function(){return this.isOnScreen(".btn-link.back-to-top")||this.isOnScreen(".js-stream-whale-end")},this.handleScroll=function(a,b){this.$node.addClass(this.attr.slideClass),!this.isFooterShown&&(b.direction==-1||this.scrolledToBottom())?(this.scrolledToBottom()&&this.$node.removeClass(this.attr.slideClass),this.$node.addClass(this.attr.fixedClass),this.isFooterShown=!0):this.isFooterShown&&b.direction==1&&!this.scrolledToBottom()&&(this.$node.removeClass(this.attr.fixedClass),this.isFooterShown=!1)},this.after("initialize",function(){this.isFooterShown=!0,this.on(document,"uiElementHasScrolled",this.handleScroll),this.on(document,"uiHasInjectedOldTimelineItems",this.handleScroll)})}var defineComponent=require("core/component");module.exports=defineComponent(FloatingFooter)
});
define("app/ui/signin_focus",["module","require","exports","core/component"],function(module, require, exports) {
function SigninFocus(){this.defaultAttrs({signinEmailInputSelector:".js-signin-email"}),this.after("initialize",function(){this.node.activeElement.tagName.toLowerCase()!="input"&&this.select("signinEmailInputSelector").focus()})}var defineComponent=require("core/component");module.exports=defineComponent(SigninFocus)
});
define("app/ui/streams/tweet_forward_module_click",["module","require","exports","core/component","app/ui/with_autoplayable_media","app/ui/with_tweet_actions_helper","app/ui/with_interaction_data"],function(module, require, exports) {
function tweetForwardModuleClick(){this.defaultAttrs({moduleSelector:".TweetWithPivotModule",pivotSelector:".TweetWithPivotModule-header a",tweetItemSelector:".tweet",itemType:"tweet",exculdesSelector:"a, .AdaptiveMedia, button"}),this.isDropdownOpen=function(){return $(document).find(".dropdown-menu:visible").size()>0},this.handlePivotClick=function(a,b,c){this.scribeModuleClick($(a.target),"pivot")},this.handleTweetClick=function(a,b,c){var d=$(a.target),e=d.closest(this.attr.moduleSelector);!a.isDefaultPrevented()&&d.closest(this.attr.exculdesSelector).size()==0&&!this.isDropdownOpen()&&b.el&&$(b.el).data("permalink-path")&&(c.position=d.closest("[data-module-position]").data("module-position"),this.triggerTweetAction("uiPermalinkClick").apply(this,arguments),this.scribeModuleClick(d,"tweet"),$(b.el).trigger("uiNavigate",{href:e.data("tweet-click-path")||$(b.el).data("permalink-path")}))},this.scribeModuleClick=function(a,b){var c=a.closest(this.attr.moduleSelector),d=c.find(this.attr.tweetItemSelector),e=c.data("scribe-context"),f=this.getModulePosition(c),g={event_info:e.type,items:[{id:d.attr("data-tweet-id"),item_type:"tweet",position:f}],targets:[{id:e.id,name:e.name,item_type:"stream",position:f}]};$(document).trigger("scribe",{scribeEvent:{component:"module_"+e.type,element:b,action:"click"},scribeData:g}),$(document).trigger("scribe",{scribeEvent:{component:"module_"+f,element:b,action:"click"},scribeData:g})},this.getModulePosition=function(a){return $(this.select("moduleSelector").sort(function(a,b){var c=$(a).position(),d=$(b).position();return Math.abs(c.top-d.top)<=100?c.left-d.left:c.top-d.top})).index(a)},this.after("initialize",function(){this.on(document,"uiCardLoaded uiStartGif","uiLOHPMediaPlay"),this.on("click",{pivotSelector:this.handlePivotClick,tweetItemSelector:this.composeHandler(this.getClosestTweet,this.mkTweetDataCollectorForAction(this.interactionDataWithCard),this.handleTweetClick)})})}var defineComponent=require("core/component"),withAutoplayableMedia=require("app/ui/with_autoplayable_media"),withTweetActionsHelper=require("app/ui/with_tweet_actions_helper"),withInteractionData=require("app/ui/with_interaction_data");module.exports=defineComponent(tweetForwardModuleClick,withAutoplayableMedia,withTweetActionsHelper,withInteractionData)
});
define("app/pages/streams/tweet_forward",["module","require","exports","app/boot/streams","app/boot/column_timeline","app/ui/streams/stream_category_bar","app/ui/cookie_warning","core/component","app/ui/streams/tweet_forward_gifs","app/ui/macaw_nymizer_signin_conversion","app/ui/media/media_preview","app/data/media_thumbnails_scribe","app/ui/more_tweet_actions_dropdown","app/ui/navigation_links","app/ui/streams/element_scroll_affixer","app/ui/streams/floating_footer","app/ui/signin_focus","app/ui/tweet_actions","app/ui/streams/tweet_forward_module_click","app/boot/profile_popup","core/utils","app/ui/gallery/gallery_opener","app/ui/with_item_actions"],function(module, require, exports) {
var bootStreams=require("app/boot/streams"),bootColumnTimeline=require("app/boot/column_timeline"),CategoryBar=require("app/ui/streams/stream_category_bar"),CookieWarning=require("app/ui/cookie_warning"),defineComponent=require("core/component"),LOHPAnimatedGifs=require("app/ui/streams/tweet_forward_gifs"),MacawNymizerSigninConversion=require("app/ui/macaw_nymizer_signin_conversion"),MediaPreview=require("app/ui/media/media_preview"),MediaThumbnailsScribe=require("app/data/media_thumbnails_scribe"),MoreTweetActionsDropdown=require("app/ui/more_tweet_actions_dropdown"),NavigationLinks=require("app/ui/navigation_links"),ScrollAffixer=require("app/ui/streams/element_scroll_affixer"),FloatingFooter=require("app/ui/streams/floating_footer"),SigninFocus=require("app/ui/signin_focus"),TweetActions=require("app/ui/tweet_actions"),TweetForwardModuleClick=require("app/ui/streams/tweet_forward_module_click"),bootProfilePopup=require("app/boot/profile_popup"),utils=require("core/utils"),GalleryOpener=require("app/ui/gallery/gallery_opener"),withItemActions=require("app/ui/with_item_actions"),ItemActions=defineComponent(withItemActions);module.exports=function(a){var b=".AppContent",c="#timeline";bootStreams(a),bootColumnTimeline(utils.merge(a,{containerSelector:".Grid.TweetForwardTimeline",endpoint:a.timeline_url,excludeConversations:!0,excludeExpandingTweets:!0,excludeUserActions:!0,itemType:"tweet",lastItemSelector:".tweet:last",pollingEnabled:!1,scrollTopOnNewItemsClick:!1})),bootProfilePopup({loggedIn:a.loggedIn}),SigninFocus.attachTo(document),CookieWarning.attachTo("#front-no-cookies-warn"),MacawNymizerSigninConversion.attachTo(".js-StreamsTopBarSignIn"),ScrollAffixer.attachTo(".StreamsTopBar",{scrollThreshold:$(".StreamsTopBar").offset().top}),ScrollAffixer.attachTo(".StreamsTopBar-container",{scrollThreshold:10,fixedClass:"StreamsTopBar-container--collapsedHero"}),FloatingFooter.attachTo(".StreamsFooter"),NavigationLinks.attachTo(".StreamsCategoryBar, .StreamsCategoryMoreOverlay",{eventData:{scribeContext:{component:"category_bar"}}});var d={itemType:"tweet",noTeardown:!0,loggedIn:a.loggedIn,eventData:{scribeContext:{component:"gallery"}}};TweetActions.attachTo(c,a,d),MoreTweetActionsDropdown.attachTo(".Gallery",a,d),MoreTweetActionsDropdown.attachTo(b,a),GalleryOpener.attachTo(b,utils.merge(a,{eventData:{scribeContext:{component:"tweet"}}})),ItemActions.attachTo(c,utils.merge(a,{itemType:"tweet"})),MediaPreview.attachTo(c,{tweetSelector:".tweet",mediaPreviewContainerSelector:".js-media-preview"}),MediaThumbnailsScribe.attachTo(document,a),LOHPAnimatedGifs.attachTo(".TweetForwardTimeline"),CategoryBar.attachTo(document),TweetForwardModuleClick.attachTo(c)}
});