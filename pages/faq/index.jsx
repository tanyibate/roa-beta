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
              Great question! ROA is the only platform that gives you the chance
              to join theinner circle of your favorite artist(s). By purchasing
              a “slice” from an artist, itunlocks the door to interactions,
              communities, and a chance to participate in ourmarketplace (once
              the marketplace launches). Slices will be limited so this is
              afirst come, first serve, platform for the most dedicated, diehard
              fans to be a partof an artist’s exclusive fan club
            </p>
          </div>

          <button className="accordion">What is a slice?</button>
          <div className="panel">
            <p>
              ROA will release a limited quantity of an artist’s slice into the
              market. We arekeeping the slices limited to ensure exclsuvity and
              tight-knit communities. Whenslices are released, you are able to
              buy one. Owning a slice gives you the abilityto develop a
              meaningful relationship with artists through intimate
              interactions. Italso gives you access to a core fan community of
              other sliceholders, pushnotifications when an artist's music
              drops, exclusive merchandise, being able toparticipate on our
              bid/ask marketplace, and much more. By owning a slice, youare not
              taking a piece of an artist’s earnings, the inherent value of the
              slice isinteractions and being a part of something, a community.
            </p>
          </div>

          <button className="accordion">
            How can sliceholders make money?
          </button>
          <div className="panel">
            <p>
              Once our bid/ask marketplace is live, slices may be bought and
              sold on it. Ifdemand for an artist’s slice rises and people are
              putting in bid orders, you areable to sell your slice to a
              matching bid. If you are looking to buy a slice on themarketplace,
              you either click bid or buy now. A bid is your offer for the
              slice, itinfers you want to buy if the price is right. If you do
              not want to place a bid, youare able to “buy.” You would be
              bypassing the bid and buying at the lowestasking price. You can
              sell your slice by placing an “ask.” The asking price iswhat you
              would be willing to sell your slice for. If a bid matches the ask,
              thetransaction goes through!
            </p>
          </div>
          <button className="accordion">
            When will the marketplace launch?
          </button>
          <div className="panel">
            <p>
              As soon as our beta comes to an end, and we officially launch ROA,
              themarketplace will be live. This beta is here to establish the
              foundationbetween sliceholders and artists. Once the foundation is
              built and weofficially launch, the marketplace will be active!
            </p>
          </div>
          <button className="accordion">How do artists make money?</button>
          <div className="panel">
            <p>
              Artists make money through the release of slices. Slices may be
              offered on our platform an infinite amount of times. If an
              artist’s career is growing and the demand for their slices is
              high, we will release more onto the platform so that our artists
              can continually bring in new revenue. Artists may also pop up
              password protected links for their sliceholders to buy exclusive
              merchandise, vinyl, or any other type of product/item they want
              them to have.
            </p>
          </div>
          <button className="accordion">
            What type of interactions do I get?
          </button>
          <div className="panel">
            <p>
              There are a plethora of interactions a sliceholder will be able to
              participate in and the examples continue to expand everyday! In
              the beginning, a lot will be digital, such as, virtual “coffee cup
              setting” conversations with the artist, Q&As with different
              themes, joining the creative process by submitting ideas to an
              artist for any project they are working on, playing video games
              with an artist and livestreaming it, VR/AR experiences, and the
              list goes on and on. As the world reopens, we will slowly begin
              incorporating in person interactions/moments as well. If you have
              an idea on how YOU would like to interact with the artist and/or
              the sliceholder community, email us, no idea is a bad idea!
            </p>
          </div>
          <button className="accordion">
            How can I buy more than one slice on this beta?
          </button>
          <div className="panel">
            <p>
              The way to purchase more than one slice is through referring 3
              friends, if all 3 friends you referred join ROA, then you are able
              to buy another slice. On your account it will show three tiers, as
              each friend signs up through your referral code, the tiers will
              move up, once you hit the third person, you can now buy one more
              slice.
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
              releasing 1-3 artists every/every other month. If you are an
              artist and think this is the platform for you, email us!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
