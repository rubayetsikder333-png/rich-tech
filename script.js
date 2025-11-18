document.addEventListener('DOMContentLoaded', function() {
    
    // GSAP ScrollTrigger plugin registration
    gsap.registerPlugin(ScrollTrigger);

    // =========================================================
    // 1. PRELOADER ANIMATION (Welcome Character Run-in - YELLOW)
    // =========================================================
    const preloader = document.getElementById('preloader-screen');
    const welcomeChar = document.getElementById('welcome-character');
    const loadingMessage = document.getElementById('loading-message');
    
    // Create the main timeline for Preloader and initial Hero setup
    const masterTl = gsap.timeline({defaults: {ease: "power2.out"}});
    
    // Initial State: Character off-screen right
    gsap.set(welcomeChar, { x: '150%', opacity: 0, scale: 0.8 });
    gsap.set(loadingMessage, { opacity: 0 });

    // --- Preloader Sequence ---
    // 1. Character runs in (1.5s)
    masterTl.to(welcomeChar, {
        x: '0%', // Move to center relative to its position, should be visually centered by CSS
        opacity: 1,
        duration: 1.5,
        ease: "power2.inOut"
    }, 0); 

    // 2. Character welcomes (arms wide, 0.5s)
    masterTl.to(welcomeChar.querySelector('.arms'), {
        rotation: 90, 
        duration: 0.5,
        ease: "back.out(1.7)"
    }, 0.5); 

    // 3. Loading message appears
    masterTl.to(loadingMessage, { opacity: 1, duration: 0.5 }, 1.0); 
    
    // 4. Fade out preloader and start Hero Slider setup immediately after (Total preloader time ~4s)
    masterTl.add("PreloaderEnd", 3.0); 

    masterTl.to(preloader, {
        opacity: 0, 
        duration: 1.0, 
        display: 'none', 
        ease: "power1.inOut"
    }, "PreloaderEnd");


    // =========================================================
    // 2. HERO SLIDER ANIMATION (3-Second Loop - YELLOW TEXT)
    // =========================================================
    const slides = gsap.utils.toArray(".slide-text");
    let currentSlide = -1;

    function slideText() {
        
        // Hide previous slide (if any)
        if (currentSlide !== -1) {
            gsap.to(slides[currentSlide], {
                opacity: 0, 
                y: "-100%", 
                duration: 0.7, 
                ease: "power2.inOut",
            });
        }
        
        // Calculate next slide index
        currentSlide = (currentSlide + 1) % slides.length;

        // Show next slide
        gsap.set(slides[currentSlide], { y: "100%", opacity: 0 }); // Reset next slide position
        gsap.to(slides[currentSlide], {
            opacity: 1, 
            y: "0%", 
            duration: 0.7, 
            ease: "power2.inOut",
        });
        
        // Loop: Wait 2 seconds, then call the function again
        gsap.delayedCall(2.0, slideText);
    }

    // Start the slider animation after the preloader timeline finishes
    masterTl.call(slideText, [], "PreloaderEnd+=0.5");


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
    .from([robot, magicBox], {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "back.out(1.2)"
    }, 0)
    // 3.2 Robot brings out skills one by one
    .from(skillItems, {
        opacity: 0,
        scale: 0.5,
        y: 100, 
        stagger: 0.2, 
        duration: 0.6,
        ease: "back.out(2)"
    }, 1.0);


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
    .from(studentChar, {
        opacity: 0, 
        scale: 0.5, 
        duration: 1.0,
        ease: "back.out(1.7)"
    }, 0)
    .from('.edu-items-box', {
        opacity: 0,
        x: -50,
        duration: 1.0,
    }, 0)
    // 4.2 Items stagger in
    .from(eduItems, {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.5,
    }, 0.5)
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
    
    // Smooth reveal of About Me and Contact sections
    gsap.utils.toArray("#about-me, #contact").forEach(section => {
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
    masterTl.from(".navbar", {
        y: -100,
        duration: 1,
        ease: "power3.out"
    }, "PreloaderEnd-=0.5");
});
