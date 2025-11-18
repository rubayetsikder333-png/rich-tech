document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================================
    // 1. PRELOADER ANIMATION (5 সেকেন্ডের লোডিং অ্যানিমেশন)
    // =========================================================
    const preloader = document.getElementById('preloader-screen');
    const loadingMessage = document.getElementById('loading-message');
    const tools = gsap.utils.toArray('.tool');
    
    const tl = gsap.timeline();
    
    // Initial State
    gsap.set(tools, { scale: 0, opacity: 0, rotation: 180 });

    // Step 1: Tools scatter in
    tl.to(tools, {
        scale: 1, opacity: 1, rotation: 0,
        x: 'random(-100, 100)', y: 'random(-50, 50)',
        stagger: 0.3, duration: 1, ease: "power2.out"
    });

    // Step 2: Loading message appears
    tl.to(loadingMessage, { opacity: 1, duration: 0.5 }, "-=1.5"); 

    // Step 3: Tools assemble into the final workstation
    tl.to('.tool-monitor', { x: 0, y: 0, duration: 1.5, ease: "back.out(1.2)" }, "+=0.5")
      .to('.tool-chair', { x: 0, y: 0, duration: 1.5, ease: "back.out(1.2)" }, "<")
      .to('.tool-keyboard', { x: 0, y: 0, duration: 1.5, ease: "back.out(1.2)" }, "<")
      .to('.tool-mouse', { x: 0, y: 0, duration: 1.5, ease: "back.out(1.2)" }, "<")
      .to('.tool-person', { x: 0, y: 0, duration: 1.5, ease: "back.out(1.2)" }, "<");

    // Step 4: Fade Out Preloader (Total duration ~5.5s)
    tl.to(preloader, {
        opacity: 0, duration: 1.0, display: 'none', ease: "power1.inOut"
    }, "+=1.0"); 


    // =========================================================
    // 2. WELCOME ANIMATION (Animation 2: Freelancer Greets)
    // =========================================================
    const welcomeChar = document.getElementById('welcome-character');

    // Run immediately after preloader fades out
    tl.from(welcomeChar, {
        x: '100%', // Moves from right to center
        opacity: 0,
        rotation: 360,
        duration: 1.5,
        ease: "back.out(1.2)"
    }, "<0.5") // Starts slightly after preloader fade-out

    // Pop up a greeting bubble
    tl.to(welcomeChar, { 
        duration: 0.5,
        scale: 1.1, 
        yoyo: true, 
        repeat: 1,
        onComplete: () => {
             // Optional: Show a quick text message here
        }
    })
    // Move character off-screen after greeting
    tl.to(welcomeChar, {
        x: '300%', 
        opacity: 0, 
        duration: 1.5, 
        ease: "power2.in"
    }, "+=1.0"); // Wait 1 second before leaving


    // =========================================================
    // 3. EDUCATION ANIMATION (Animation 3: Student Character)
    // =========================================================
    const studentChar = document.getElementById('student-character');
    const educationItems = gsap.utils.toArray('.edu-item');

    gsap.timeline({
        scrollTrigger: {
            trigger: "#education",
            start: "top 70%", // Starts when Education section hits 70% of viewport
            toggleActions: "play none none none"
        }
    })
    .to(studentChar, {
        opacity: 1, 
        scale: 1, 
        rotation: 0,
        duration: 1.0,
        ease: "back.out(1.7)"
    })
    .from(educationItems, {
        x: -50,
        opacity: 0,
        stagger: 0.2, // Items appear one after the other
        duration: 0.8,
        ease: "power2.out"
    }, "<0.3"); // Starts slightly before character finishes


    // =========================================================
    // 4. SKILLS ANIMATION (Animation 4: Robot & Magic Box)
    // =========================================================
    const robot = document.getElementById('skill-robot');
    const magicBox = document.getElementById('magic-box');
    const skillItems = gsap.utils.toArray('.skill-item');

    gsap.timeline({
        scrollTrigger: {
            trigger: "#skills",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    })
    // 4.1 Robot and Box appear
    .to([robot, magicBox], {
        opacity: 1,
        y: 100, // Box moves down a bit
        duration: 1.5,
        ease: "power2.out"
    })
    // 4.2 Robot brings out skills one by one
    .to(robot, {
        rotation: 360, // Robot spins slightly
        duration: 0.5,
        yoyo: true,
        repeat: 1
    }, "<0.5") // Robot movement starts halfway through box appearance

    .from(skillItems, {
        opacity: 0,
        scale: 0.5,
        y: -100, // Appears to drop from the box
        stagger: 0.3, // Skills revealed one by one
        duration: 0.5,
        ease: "back.out(2)"
    });


    // =========================================================
    // 5. GENERAL PAGE ANIMATION
    // =========================================================
    
    // Smooth reveal of general sections
    gsap.utils.toArray(".info-section, .contact-section").forEach(section => {
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

    // Header Animation (to run after preloader, but we managed that with tl)

    // Navbar reveal
    gsap.from(".navbar", {
        y: -100,
        duration: 1,
        delay: 0.5, // Runs after preloader is mostly done
        ease: "power3.out"
    });
});
