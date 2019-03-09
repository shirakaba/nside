// SKScene is SpriteKit; SCN is SceneKit
// https://stackoverflow.com/questions/26225236/swift-spritekit-adding-button-programmatically
const ButtonTestScene = SKScene.extend(
    {
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
        protocols: []
    }
);

ButtonTestScene.alloc().initWithSize(CGSizeMake(25, 25));

// https://stackoverflow.com/questions/53104428/spritekit-example-without-storyboard
const GameViewController = UIViewController.extend(
    {
        viewDidLoad: function(){
            UIViewController.prototype.viewDidLoad.apply(this, arguments);

            this.view = SKView.alloc().initWithFrame(this.view.bounds);
            if(this.view instanceof SKView){
                const scene = ButtonTestScene.alloc().initWithSize(
                    self.view.bounds.size
                );

                scene.scaleMode = SKSceneScaleMode.AspectFill;

                self.view.presentScene(scene);
                self.view.showsPhysics = false;
                self.view.ignoresSiblingOrder = true;
                self.view.showsFPS = true;
                self.view.showsNodeCount = true;
            }
        }
    },
    {
        name: "GameViewController",
        protocols: []
    }
);

const gamevc = GameViewController.alloc().init();

function getUIViewController(uiresponder){
    for(let responder = uiresponder; responder !== null; responder = responder.nextResponder){
        if(responder instanceof UIViewController) return responder;
    }
    return null;
}

const vc = getUIViewController(design.ios);
if(vc !== null){
    vc.presentViewControllerAnimatedCompletion(
        gamevc,
        true,
        () => {
            // On completion
        }
    );
}

// presentViewControllerAnimatedCompletion(viewControllerToPresent: UIViewController, flag: boolean, completion: () => void): void;