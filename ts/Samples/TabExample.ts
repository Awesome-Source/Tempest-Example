class TabExample implements IWidget{
    
    private _tabBar: TabBarWidget;

    constructor(){
        var tabBarLeft = new TabWidget(new TextWidget("Left"), new TextWidget("Left Content"));
        var tabBarRight = new TabWidget(new TextWidget("Right"), new TextWidget("Right Content"));

        this._tabBar = new TabBarWidget("examplebar",[tabBarLeft, tabBarRight])
    }

    Render(ctx: RenderContext): VNode {
        
        return this._tabBar
            .Render(ctx)
            .WithClass("t-padding-small");
    }

}