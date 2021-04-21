import React, { useEffect, useState } from "react";
import styles from "../../styles/FAQ.module.scss";

export default function index() {
  useEffect(() => {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }, []);
  return (
    <div className={styles.faq_page}>
      <div>
        <h2> ? : (Pronounced row-uh)</h2>

        <div className="accordion-container">
          <button className="accordion">What the f**k is ROA?</button>
          <div className="panel">
            <p>
              ROA is the only platform that gives you the chance to join the
              inner circle of your favorite artist(s). By purchasing a “slice”
              from an artist, you enter something that nobody else can, but
              everybody else will want into. Slices will be limited, this is a
              first come, first serve, platform for the most dedicated, diehard
              fans to be a part of an artist’s exclusive circle.
            </p>
          </div>

          <button className="accordion">What is a slice?</button>
          <div className="panel">
            <p>
              To put it simply, a slice = access. Access to a multi platform
              community led by each artist themselves. Slices are limited and
              there is no guarantee we will produce more. Each artist will have
              a community tailored to their specific fanbase. ROA is a place
              where superfans can build real relationships with their favorite
              artist(s). Eventually, slices will be able to be bought and sold
              on our marketplace. Welcome to the future of fanbases.
            </p>
          </div>

          <button className="accordion">
            When will the marketplace launch?
          </button>
          <div className="panel">
            <p>
              The marketplace is going to launch soon after our beta ends and we
              officially launch ROA. We want to establish the foundation and
              relationship between sliceholders and artists before we launch the
              marketplace.
            </p>
          </div>
          <button className="accordion">What are arrivals?</button>
          <div className="panel">
            <p>
              Arrivals are what you are able to do with an artist. There are an
              infinite amount of arrivals a sliceholder will be able to
              participate in and the examples continue to expand everyday! For
              example, sit down “coffee cup setting” conversations with the
              artist, Q&As with different themes, joining the creative process
              by submitting ideas to an artist for any project they are working
              on, playing video games with an artist and livestreaming it, VR/AR
              experiences, and the list goes on and on. As the world reopens, we
              will slowly begin incorporating in person arrivals/moments as
              well. If you have an idea on how YOU would like to interact with
              the artist and/or the sliceholder community, email us, no idea is
              a bad idea!
            </p>
          </div>
          <button className="accordion">
            How can I buy more than one slice on this beta?
          </button>
          <div className="panel">
            <p>
              Each user has a referral code they can use to invite friends to
              sign up. Every 3 successful referral sign ups unlock the ability
              to purchase an additional slice. You can see your referral
              progress on the “My Slices” page.
            </p>
          </div>
          <button className="accordion">
            Can any artist sign up for this?
          </button>
          <div className="panel">
            <p>
              ROA is an invite only platform for artists. We want to keep the
              roster exclusive, ensure talent, and artists who are hungry to
              engage with their fans and grow together. We will only be
              releasing 1-3 artbaists every/every other month. If you are an
              artist and think this is the platform for you, email us!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
