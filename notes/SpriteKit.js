function getUIViewController(uiresponder){
    for(let responder = uiresponder; responder !== null; responder = responder.nextResponder){
        if(responder instanceof UIViewController) return responder;
    }
    return null;
}

// SKScene is SpriteKit; SCN is SceneKit
// https://stackoverflow.com/questions/26225236/swift-spritekit-adding-button-programmatically
const BattlefieldScene = SKScene.extend(
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
                if(this.button.containsPoint(location)){
                    // Respond to tap somehow.
                    this.button.color = UIColor.alloc().initWithRedGreenBlueAlpha(0,0,1,1);
                    // getUIViewController(this.view).view.backgroundColor = UIColor.alloc().initWithRedGreenBlueAlpha(0,0,1,1);
                } else {
                    this.button.color = UIColor.alloc().initWithRedGreenBlueAlpha(0,1,0,1);
                }
            });
        }
    },
    {
        name: "BattlefieldScene",
        protocols: []
    }
);
// BattlefieldScene.alloc().initWithSize(design.ios.bounds.size);

// https://stackoverflow.com/questions/53104428/spritekit-example-without-storyboard
const GameViewController = UIViewController.extend(
    {
        viewDidLoad: function(){
            UIViewController.prototype.viewDidLoad.apply(this, arguments);

            this.view = SKView.alloc().initWithFrame(this.view.bounds);
            if(this.view instanceof SKView){
                const scene = BattlefieldScene.alloc().initWithSize(
                    this.view.bounds.size
                );
                // scene.view.backgroundColor = UIColor.alloc().initWithRedGreenBlueAlpha(0,1,0,1);

                scene.scaleMode = SKSceneScaleMode.AspectFill;

                this.view.presentScene(scene);
                this.view.showsPhysics = false;
                this.view.ignoresSiblingOrder = true;
                this.view.showsFPS = true;
                this.view.showsNodeCount = true;
            }
        }
    },
    {
        name: "GameViewController",
        protocols: []
    }
);

const gamevc = GameViewController.alloc().init();

// design.ios.view = gamevc.view;
// design.ios.addSubview(gamevc.view);

const vc = getUIViewController(app.ios);
if(vc !== null){
    vc.presentViewControllerAnimatedCompletion(
        gamevc,
        true,
        () => {
            // On completion
        }
    );

    // vc.presentModalViewControllerAnimated(
    //     gamevc,
    //     true
    // );
}