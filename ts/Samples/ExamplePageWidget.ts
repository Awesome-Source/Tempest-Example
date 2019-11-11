class ExamplePageWidget implements IWidget{

    private _tabBar: TabBarWidget;

    constructor(){

        var tabBarList = new TabWidget(new TextWidget("List Widget"), this.getListWidgetExample());
        var tabBarFancyList = new TabWidget(new TextWidget("Fancy ListWidget"), this.getFancyListWidgetExample());
        var tabBarState = new TabWidget(new TextWidget("Simple State"), this.getSimpleStateExample());
        var tabBarConditional = new TabWidget(new TextWidget("Conditional"), this.getConditionalExample());
        var tabBarColorButton = new TabWidget(new TextWidget("Color Button"), this.getColorButtonExample());
        var tabBarAlignment = new TabWidget(new TextWidget("Alignment"), this.getAlignmentExample());
        var tabBarTab = new TabWidget(new TextWidget("Tab"), this.getTabExample());

        this._tabBar = new TabBarWidget("menubar", [tabBarList, tabBarFancyList, tabBarState, tabBarConditional, tabBarColorButton, tabBarAlignment, tabBarTab]);
        this._tabBar.ColorClass = "t-deep-orange";
    }

    Render(ctx: RenderContext): VNode {

        return new VNode("div")
            .WithChild(this._tabBar.Render(ctx));
    }

    private getListWidgetExample() {

        var listContents: string[] = [];
        for(var i = 0; i < 5; i++){
            listContents.push(i.toString());
        }

        var list = new ListWidget(listContents.map(l => (new TextWidget(l))));
        return new CardContainerWidget(list);
    }

    private getFancyListWidgetExample(){
        var listContents: string[] = [];
        for(var i = 0; i < 5; i++){
            listContents.push(i.toString());
        }

        var list = new ListWidget(listContents.map(l => (new FancyListItem(new FancyListItem( new TextWidget(l))))));
        return new CardContainerWidget(list);
    }

    private getSimpleStateExample(){
        return new CardContainerWidget(new SimpleStateExample());
    }

    private getConditionalExample(){
        return new CardContainerWidget(new ConditionalContentExample());
    }
    
    private getColorButtonExample(){
        return new CardContainerWidget(new ColorButtonExample());
    }

    private getAlignmentExample(){
        return new CardContainerWidget(new AligmentExample());
    }

    private getTabExample(){
        return new CardContainerWidget(new TabExample());
    }
}