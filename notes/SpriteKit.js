// Ray Wenderlich: https://www.raywenderlich.com/906-scenekit-tutorial-with-swift-part-2-nodes
// For 3D experiments, see: https://www.weheartswift.com/introduction-scenekit-part-1/

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
                CGSizeMake(25, 25)
            );
            this.villain = SKSpriteNode.alloc().initWithColorSize(
                UIColor.alloc().initWithRedGreenBlueAlpha(1,0,0,1),
                CGSizeMake(50, 50)
            );
            this.hero.position = CGPointMake(
                CGRectGetMidX(this.frame),
                3 * (CGRectGetMidY(this.frame) / 2),
            );
            this.heroTargetPos = this.hero.position;
            this.villain.position = CGPointMake(
                CGRectGetMidX(this.frame),
                CGRectGetMidY(this.frame) / 2,
            );
            this.heroBaseSpeed = 5;
            this.villainBaseSpeed = 3;

            this.addChild(this.hero);
            this.addChild(this.villain);
        },

        update: function(currentTime){
            /* Somehow not working: https://stackoverflow.com/questions/33818362/is-there-a-way-to-read-get-fps-in-spritekit-swift */
            // const deltaTime = currentTime - (this.lastUpdateTime ? this.lastUpdateTime : currentTime - 0.06);
            // const currentFPS = 1 / deltaTime;
            // this.lastUpdateTime = currentTime;

            const idealDeltaTime = 60;
            const idealFPS = 0.0166666;

            /* Close the gap with the hero within one second */
            // const vPos = this.villain.position;
            // const hPos = this.hero.position;
            // this.villain.position = CGPointMake(
            //     vPos.x - ((vPos.x - hPos.x) * idealFPS),
            //     vPos.y - ((vPos.y - hPos.y) * idealFPS)
            // );

            const diffFn = function diff(baseSpeed, currentPos, targetPos, deltaTime, currentRotationInRadians){
                /* origin */
                const xDiff = targetPos.x - currentPos.x;
                const yDiff = targetPos.y - currentPos.y;

                const angleInRadians = Math.atan2(yDiff, xDiff);
                const speed = baseSpeed / (1000 / deltaTime);
                const maxAdvanceX = Math.cos(angleInRadians) * (speed * deltaTime);
                const maxAdvanceY = Math.sin(angleInRadians) * (speed * deltaTime);
    
                const x = xDiff >= 0 ?
                    Math.min(currentPos.x + maxAdvanceX, targetPos.x) :
                    Math.max(currentPos.x + maxAdvanceX, targetPos.x);
                const y = yDiff >= 0 ?
                    Math.min(currentPos.y + maxAdvanceY, targetPos.y) :
                    Math.max(currentPos.y + maxAdvanceY, targetPos.y);
                /***********/

                /* rotation */
                const degToRad = Math.PI / 180;
                const radToDeg = 180 / Math.PI;
                // We'll convert to degrees and calculate as such
                const extraRotation = (angleInRadians * radToDeg) - (currentRotationInRadians * radToDeg);
                const easing = 4;

                const optimalRotation = extraRotation < -180 ?
                    360 + extraRotation :
                    (
                        extraRotation > 180 ?
                            extraRotation - 360 :
                            extraRotation
                    );
                const optimalEasedRotation = optimalRotation / easing;
                const newRotationInDegrees = (currentRotationInRadians + optimalEasedRotation) % 360;
                // zRotation is in radians
                /***********/


                return {
                    point: CGPointMake(x, y),
                    rotation: newRotationInDegrees * degToRad
                }
            }

            const forVillain = diffFn(this.villainBaseSpeed, this.villain.position, this.hero.position, idealDeltaTime, this.villain.zRotation);
            const forHero = diffFn(this.heroBaseSpeed, this.hero.position, this.heroTargetPos, idealDeltaTime, this.hero.zRotation);

            this.villain.position = forVillain.point;
            this.villain.zRotation = forVillain.rotation;

            this.hero.position = forHero.point;
            this.hero.zRotation = forVillain.rotation;
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

                /* Close gap with target in one second */
                // this.hero.runActionCompletion(
                //     SKAction.moveToDuration(CGPointMake(location.x, location.y), 1),
                //     () => {
                //         this.button.color = UIColor.alloc().initWithRedGreenBlueAlpha(0,1,1,1);
                //     }
                // );

                this.heroTargetPos = location;
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