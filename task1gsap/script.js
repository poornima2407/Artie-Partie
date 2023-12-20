gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});






// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


var tl = gsap.timeline()
tl.from("#nav h1",{
    y:-50,
    duration:0.8,
    opacity:0,
    delay:1
})
tl.from("#nav h3",{
    y:-50,
    duration:1,
    stagger:0.3,
    opacity:0,
})
tl.from("#part1 h1",{
    x:-80,
    opacity:0,
})
tl.from("#part1 p",{
    x:-80,
    opacity:0,
})
tl.from("#part1 button",{
    y:150,
    opacity:0,
})
tl.from("#part2 img",{
    x:300,
    opacity:0,
    scale:0.5
},"-=1")
tl.from("#page2 h1",{
    y:50,
    opacity:0,
    duration:1,
    scrollTrigger:{
        trigger:"#page2 h1",
        scroller:"#main",
        markers:false,
        start:"top 60%",
        end:"top 59%",
        scrub:3
    }
})
