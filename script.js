document.addEventListener('DOMContentLoaded', function() {
    
    // GSAP ScrollTrigger plugin registration
    gsap.registerPlugin(ScrollTrigger);

    // =========================================================
    // 1. PRELOADER ANIMATION (Welcome Character Run-in - YELLOW)
    // =========================================================
    const preloader = document.getElementById('preloader-screen');
    const welcomeChar = document.getElementById('welcome-character');
    const loadingMessage = document.getElementById('loading-message');
    
    const tl = gsap.timeline({defaults: {ease: "power2.out"}});
    
    // Initial State: Character off-screen right
    gsap.set(welcomeChar, { x: '150%', opacity: 0, scale: 0.8 });
    gsap.set(loadingMessage, { opacity: 0 });

    // Step 1: Character runs in (1.5s)
    tl.to(welcomeChar, {
        x: '-50%', // Move to center
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut"
    });

    // Step 2: Character welcomes (arms wide, 0.5s)
    tl.to(welcomeChar.querySelector('.arms'), {
        rotation: 90, 
        duration: 0.5,
        ease: "back.out(1.7)"
    }, "<"); // Start with character move

    // Step 3: Loading message appears
    tl.to(loadingMessage, { opacity: 1, duration: 0.5 }, "+=0.5"); 
    
    // Step 4: Hold for a moment, then fade out preloader
    tl.to(preloader, {
        opacity: 0, 
        duration: 1.0, 
        display: 'none', 
        ease: "power1.inOut"
    }, "+=1.5"); // Total preloader time ~4 seconds


    // =========================================================
    // 2. HERO SLIDER ANIMATION (3-Second Loop - YELLOW TEXT)
    // =========================================================
    const slides = gsap.utils.toArray(".slide-text");
    let currentSlide = 0;

    function slideText() {
        // Hide current slide (move up)
        gsap.to(slides[currentSlide], {
            opacity: 0, 
            y: "-100%", 
            duration: 0.7, 
            ease: "power2.inOut",
            className: 'slide-text'
        });

        // Calculate next slide index (resets after the last slide)
        currentSlide = (currentSlide + 1) % slides.length;

        // Show next slide (move in from below)
        gsap.set(slides[currentSlide], { y: "100%" }); // Reset next slide position
        gsap.to(slides[currentSlide], {
            opacity: 1, 
            y: "0%", 
            duration: 0.7, 
            ease: "power2.inOut",
            className: 'slide-text active-text'
        });
        
        // After the last slide, wait 2 seconds, then restart the whole loop
        if (currentSlide === slides.length - 1) {
             // If last slide, set a timer to run the next slide
             gsap.delayedCall(2, slideText);
        } else {
             // For middle slides, run next slide after 2 seconds
             gsap.delayedCall(2, slideText);
        }
    }

    // Start the slider animation after the preloader finishes
    tl.call(() => {
        // Initially set the first slide
        gsap.set(slides[0], { opacity: 1, y: "0%", className: 'slide-text active-text' });
        
        // Start the sliding loop after an initial display time
        gsap.delayedCall(2, slideText);

    }, ">0.5");


    // =========================================================
    // 3. SKILLS ANIMATION (Robot & Magic Box)
    // =========================================================
    const robot = document.getElementById('skill-robot');
    const magicBox = document.getElementById('magic-box');
    const skillItems = gsap.utils.toArray('#magic-box .skill-item');

    gsap.timeline({
        scrollTrigger: {
            trigger: "#skills",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    })
    // 3.1 Robot and Box appear
    .to([robot, magicBox], {
        opacity: 1,
        y: 0, // Moves to final position
        duration: 1.5,
        ease: "back.out(1.2)"
    }, 0)
    // 3.2 Robot brings out skills one by one
    .from(skillItems, {
        opacity: 0,
        scale: 0.5,
        y: 100, // Appears to drop from the box
        stagger: 0.2, // Skills revealed one by one
        duration: 0.6,
        ease: "back.out(2)"
    }, "<0.5"); // Starts slightly after robot appears

    // =========================================================
    // 4. EDUCATION ANIMATION (Student Character with look animation)
    // =========================================================
    const studentChar = document.getElementById('student-character');
    const eduItems = gsap.utils.toArray('.edu-item');

    gsap.timeline({
        scrollTrigger: {
            trigger: "#education",
            start: "top 70%", 
            toggleActions: "play none none none"
        }
    })
    // 4.1 Character and box appear
    .to(studentChar, {
        opacity: 1, 
        scale: 1, 
        duration: 1.0,
        ease: "back.out(1.7)"
    }, 0)
    .to('.edu-items-box', {
        opacity: 1,
        x: 0,
        duration: 1.0,
    }, 0)
    // 4.2 Items stagger in
    .from(eduItems, {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.5,
    }, "<0.5")
    // 4.3 Character looking animation (Book -> Laptop -> Book)
    .to(studentChar.querySelector('.book'), {
        rotation: -10, // Tilt towards book
        duration: 0.5,
    }, "+=0.5")
    .to(studentChar.querySelector('.laptop'), {
        rotation: 10, // Tilt towards laptop
        duration: 0.5,
        yoyo: true, // Go back
        repeat: 1,
    }, "+=0.5")
    .to(studentChar.querySelector('.book'), {
        rotation: 0, // Go back to normal
        duration: 0.5,
    }, "+=0.5");


    // =========================================================
    // 5. GENERAL SECTION ANIMATION
    // =========================================================
    
    // Smooth reveal of Hero details, About Me and Contact sections
    gsap.utils.toArray(".hero-text, #about-me, #contact").forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // Navbar reveal (after preloader is gone)
    gsap.from(".navbar", {
        y: -100,
        duration: 1,
        delay: 0.5, 
        ease: "power3.out"
    });
});
