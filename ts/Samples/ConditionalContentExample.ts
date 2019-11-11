class ConditionalContentExample implements IWidget
{
    private _expanded: boolean;

    constructor(){
        this._expanded = false;
    }

    private HandleToggle(self: ConditionalContentExample, ctx: RenderContext)
    {
        return () => {
            self._expanded = !self._expanded;
            ctx.Render();    
        };
    }

    Render(ctx: RenderContext): VNode {
        var toggleButton = new ButtonWidget("toggle", new TextWidget(this._expanded ? "Collapse" : "Expand"));
        toggleButton.OnClick = this.HandleToggle(this, ctx);

        var box = new VNode("div")
        .WithClass("t-padding-small")
        .WithChildren([
            toggleButton.Render(ctx)
        ]);

        if(this._expanded){
            var listContents: string[] = [];
            for(var i = 0; i < 5; i++){
                listContents.push(i.toString());
            }
    
            var list = new ListWidget(listContents.map(l => (new FancyListItem(new FancyListItem( new TextWidget(l))))));

            box.ChildElements.push(list.Render(ctx))
        }

        return box;
    }

}