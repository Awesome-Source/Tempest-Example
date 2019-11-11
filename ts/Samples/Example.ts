document.addEventListener("DOMContentLoaded", function (_event) {
    Example.Init();
});

class Example{
    public static Init(){
        var exampleTempest = new Tempest("example", new ExamplePageWidget());
        exampleTempest.Render();
    }    
}
