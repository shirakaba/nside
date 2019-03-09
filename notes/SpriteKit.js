function getUIViewController(uiresponder){
    for(let responder = uiresponder; responder !== null && typeof responder !== "undefined"; responder = responder.nextResponder){
        if(responder instanceof UIViewController) return responder;
    }
    return null;
}

// SKScene is SpriteKit; SCN is SceneKit
// https://stackoverflow.com/questions/26225236/swift-spritekit-adding-button-programmatically
const BattlefieldScene = SKScene.extend(
    {
        // private button!: SKSpriteNode;
        // private hero!: SKSpriteNode;
        // private villain!: SKSpriteNode;

        didMoveToView: function (view){
            this.button = SKSpriteNode.alloc().initWithColorSize(
                UIColor.alloc().initWithRedGreenBlueAlpha(1,1,0,1),
                CGSizeMake(100, 44)
            );
            this.button.position = CGPointMake(0, 0);
            this.addChild(this.button);

            this.hero = SKSpriteNode.alloc().initWithColorSize(
                UIColor.alloc().initWithRedGreenBlueAlpha(0,0,1,1),
                CGSizeMake(50, 50)
            );
            this.villain = SKSpriteNode.alloc().initWithColorSize(
                UIColor.alloc().initWithRedGreenBlueAlpha(1,0,0,1),
                CGSizeMake(75, 75)
            );
            this.hero.position = CGPointMake(
                CGRectGetMidX(this.frame),
                3 * (CGRectGetMidY(this.frame) / 2),
            );
            this.villain.position = CGPointMake(
                CGRectGetMidX(this.frame),
                CGRectGetMidY(this.frame) / 2,
            );

            this.addChild(this.hero);
            this.addChild(this.villain);
        },

        update: function(currentTime){
            // this.hero.position = 

        },

        // touchesEndedWithEvent(touches: NSSet<UITouch>, event: _UIEvent): void;
        touchesEndedWithEvent: function (touches, event){
            // Synchronous
            touches.enumerateObjectsUsingBlock((touch, i) => {
                const location = touch.locationInNode(this);
                if(this.button.containsPoint(location)){
                    this.button.color = UIColor.alloc().initWithRedGreenBlueAlpha(0,0,1,1);
                } else {
                    this.button.color = UIColor.alloc().initWithRedGreenBlueAlpha(0,1,0,1);
                }

                this.hero.runActionCompletion(
                    SKAction.moveToDuration(CGPointMake(location.x, location.y), 1),
                    () => {
                        this.button.color = UIColor.alloc().initWithRedGreenBlueAlpha(0,1,1,1);
                    }
                )
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

const vc = getUIViewController(design.ios);
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