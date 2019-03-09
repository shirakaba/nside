// SKScene is SpriteKit; SCN is SceneKit
// https://stackoverflow.com/questions/26225236/swift-spritekit-adding-button-programmatically
const ButtonTestScene = SKScene.extend(
    {
        initWithFrame(frame){
            SKScene.prototype.init.apply(this, []);
            // this.frame = frame; /* readonly */
            // this.frame.size = frame.size;
            // this.frame.size.x = frame.size.x;
            // this.frame.size.y = frame.size.y;
            this.frame.origin = frame.origin;
            return this;
        },
        didMoveToView: function (view){
            this.button = SKSpriteNode.alloc().initWithColorSize(
                UIColor.alloc().initWithRedGreenBlueAlpha(1,0,0,1),
                CGSizeMake(100, 44)
            );

            this.button.position = CGPointMake(
                CGRectGetMidX(this.frame),
                CGRectGetMidY(this.frame),
            );

            this.addChild(this.button);
        },

        // touchesEndedWithEvent(touches: NSSet<UITouch>, event: _UIEvent): void;
        touchesEndedWithEvent: function (touches, event){
            // Synchronous
            touches.enumerateObjectsUsingBlock((touch, i) => {
                const location = touch.locationInNode(this);
                if(button.containsPoint(location)){
                    // Respond to tap somehow.
                }
            });
        }
    },
    {
        name: "ButtonTestScene",
        protocols: [],
        exposedMethods: {
            "initWithFrame": {
                params: [CGRect],
                returns: SKScene
            }
        }
    }
);

ButtonTestScene.alloc().initWithFrame(CGRectMake(2, 2, 25, 25));


const GameViewController = UIViewController.extend(
    {
        viewDidLoad: function(){
            UIViewController.prototype.viewDidLoad.apply(this, arguments);

            this.view = SKView.alloc().initWithFrame(this.view.bounds);
            if(this.view instanceof SKView){
                const scene = 
            }
        }
    },
    {
        name: "GameViewController",
        protocols: []
    }
);

new GameViewController();


// https://stackoverflow.com/questions/53104428/spritekit-example-without-storyboard
/*
class GameViewController: UIViewController {

    // MARK: View Controller overrides
    override func viewDidLoad() {
        super.viewDidLoad()

        view = SKView(frame: view.bounds)

        if let view = self.view as! SKView? {
            // Initialise the scene
            let scene = GameScene(size: view.bounds.size) // <-- IMPORTANT: Initialise your first scene (as you have no .sks)

            // Set the scale mode to scale to fit the window
            scene.scaleMode = .aspectFill

            // Present the scene
            view.presentScene(scene)

            // Scene properties
            view.showsPhysics = false
            view.ignoresSiblingOrder = true
            view.showsFPS = true
            view.showsNodeCount = true
        }
    }

}