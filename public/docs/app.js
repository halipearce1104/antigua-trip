(function () {
  'use strict';

  // ---------------------------------------------------------------------
  // Data (ported from Antigua Trip App.dc.html)
  // ---------------------------------------------------------------------

  var INACTIVE = 'rgba(31,41,55,0.32)';
  var TAB_COLOR = { trip: '#14b8a6', docs: '#ff6b6b', pack: '#e0a300', explore: '#4caf82', resort: '#a78bfa' };
  var TAB_BG = { trip: 'rgba(20,184,166,0.1)', docs: 'rgba(255,107,107,0.1)', pack: 'rgba(224,163,0,0.1)', explore: 'rgba(76,175,130,0.1)', resort: 'rgba(167,139,250,0.1)' };

  var RESORT_SECTIONS = [
    { name: 'Restaurants', color: '#ff6b6b', items: [
      { title: 'Gourmet Marché', desc: 'Buffet — breakfast, lunch & dinner, international + local, no reservation' },
      { title: 'Hunter Steakhouse', desc: 'Open-kitchen steakhouse with a sommelier — dinner only, smart casual', badge: 'Don’t miss' },
      { title: 'Grazie Italian Trattoria', desc: 'Family-style Italian classics — dinner only, casual resort attire' },
      { title: 'Caribbean Restaurant & Grill', desc: 'Local Caribbean cuisine with a great view' },
      { title: 'Beach Club Grill', desc: 'Burgers, sandwiches & grilled favorites, steps from the sand' },
      { title: 'C/X Culinary Experience', desc: 'Ticketed 7-course chef’s table — the splurge option, extra cost', badge: 'Don’t miss' },
    ]},
    { name: 'Bars', color: '#ffc93c', items: [
      { title: 'Swim-Up Bar', desc: 'Poolside, unlimited top-shelf pours' },
      { title: 'Beach Bar', desc: 'Chilled drinks steps from the water' },
      { title: 'Lobby Bar', desc: 'Cocktails and people-watching, open late' },
      { title: 'Sports Bar', desc: 'Big screens for the game, food service till 9:30 PM' },
    ]},
    { name: 'Activities', color: '#14b8a6', items: [
      { title: 'Watersports', desc: 'Kayaking, paddleboarding, snorkeling — non-motorized, no extra cost' },
      { title: 'Scuba diving', desc: 'Intro lessons available on-site' },
      { title: 'Casino', desc: '4,300+ sq ft gaming floor' },
      { title: 'Nightly live entertainment', desc: 'Shows at the open-air or main theatre' },
      { title: 'Tennis courts', desc: 'On-property, racquets available' },
    ]},
    { name: 'Spa', color: '#4caf82', items: [
      { title: 'The Royal Spa', desc: 'Massages, facials, hydrotherapy, mani/pedi — book early, slots fill fast' },
    ]},
  ];

  var BUTLER_TIPS = [
    'Text your butler the morning you land to lock in dinner reservations at Hunter Steakhouse and Grazie Trattoria before they fill up.',
    'Ask for a private beach or pool setup with chairs, towels, and shade reserved before you head down.',
    'Have the butler arrange in-suite breakfast so you can sleep in before excursion days.',
    'Request bottle service or a stocked minibar with your group’s preferred drinks.',
    'Ask about arranging a private sunset toast or a small in-suite celebration for the White Party after-party.',
    'Get help booking spa treatments and securing prime cabana spots for pool days.',
  ];

  var ITINERARY = [
    { date: 'Wed · Aug 13', items: [
      { time: '1:35 PM', title: 'Flight lands in Antigua', sub: 'Whole squad arrives together, V.C. Bird Intl (ANU)', tag: 'flight' },
      { time: '2:15 PM', title: 'Airport transfer', sub: 'VIP transfer to Royalton Antigua', tag: 'transport' },
      { time: '3:00 PM', title: 'Check-in', sub: 'Butler Service Bay View, Junior Suite', tag: 'hotel' },
      { time: 'Afternoon', title: 'Beach + pool', sub: 'Settle in, first dip in the Caribbean', tag: 'beach' },
      { time: '7:00 PM', title: 'Welcome dinner', sub: 'On property — see Resort tab for restaurant picks', tag: 'food' },
    ]},
    { date: 'Thu · Aug 14', items: [
      { time: '8:00 AM', title: 'Breakfast', sub: 'Gourmet Marché buffet', tag: 'food' },
      { time: 'Morning', title: 'Free beach time', sub: 'Pool bar + hammocks', tag: 'beach' },
      { time: '7:00 PM', title: 'Dinner', sub: 'On property — see Resort tab for restaurant picks', tag: 'food' },
      { time: '9:00 PM', title: 'Royalton White Party', sub: 'Dress in white — beachside DJ + dancing, the resort’s signature night', tag: 'excursion' },
    ]},
    { date: 'Fri · Aug 15', items: [
      { time: '8:15 AM', title: 'Meet at hotel lobby', sub: 'Royalton Antigua — arrive 15 min early', tag: 'excursion' },
      { time: '8:30 AM', title: 'Catamaran cruise & snorkel', sub: 'Excellence Catamaran — lunch + drinks included, voucher 4CGM5B', tag: 'excursion' },
      { time: '1:00 PM', title: 'Lunch + shopping', sub: 'St. John’s', tag: 'food' },
      { time: '7:00 PM', title: 'Last-night dinner', sub: 'On property — see Resort tab for restaurant picks', tag: 'food' },
      { time: 'Late', title: 'Beach bonfire', sub: 'Last-night toast', tag: 'beach' },
    ]},
    { date: 'Sat · Aug 16', items: [
      { time: '8:00 AM', title: 'Breakfast + pack up', sub: 'Last resort breakfast', tag: 'food' },
      { time: '11:00 AM', title: 'Check-out', sub: 'Royalton Antigua', tag: 'hotel' },
      { time: '11:36 AM', title: 'Airport transfer', sub: 'VIP transfer back to V.C. Bird Intl', tag: 'transport' },
      { time: '1:25 PM', title: 'Annie’s flight departs', sub: 'AA3039 → Miami, then home to Atlanta', tag: 'flight' },
      { time: '2:36 PM', title: 'Hali & Kay’s flight departs', sub: 'AA2394 · Wheels up, see you soon', tag: 'flight' },
    ]},
  ];

  var TAG_COLOR = { flight: '#38bdf8', transport: '#ffb648', hotel: '#14b8a6', beach: '#4caf82', food: '#ff6b6b', excursion: '#ff8fab', explore: '#14b8a6' };
  var TAG_BG = { flight: 'rgba(56,189,248,0.12)', transport: 'rgba(255,182,72,0.14)', hotel: 'rgba(20,184,166,0.12)', beach: 'rgba(76,175,130,0.12)', food: 'rgba(255,107,107,0.12)', excursion: 'rgba(255,143,171,0.14)', explore: 'rgba(20,184,166,0.12)' };

  var WEATHER = [
    { d: 'Wed 13', hi: 88, lo: 77, iconColor: '#ffc93c' },
    { d: 'Thu 14', hi: 87, lo: 77, iconColor: '#8ac6e0' },
    { d: 'Fri 15', hi: 88, lo: 78, iconColor: '#ffc93c' },
    { d: 'Sat 16', hi: 89, lo: 77, iconColor: '#ffc93c' },
  ];

  var PACK_CATEGORIES = [
    { name: 'Documents', items: [
      { id: 'doc1', label: 'Passport' },
      { id: 'doc2', label: 'Booking confirmations' },
      { id: 'doc3', label: 'Travel insurance card' },
      { id: 'doc4', label: 'ID / driver’s license' },
    ]},
    { name: 'Beach Essentials', items: [
      { id: 'b1', label: 'Swimsuits (x2+)' },
      { id: 'b2', label: 'Reef-safe sunscreen' },
      { id: 'b3', label: 'Beach bag' },
      { id: 'b4', label: 'Sunglasses' },
      { id: 'b5', label: 'Sandals / flip-flops' },
    ]},
    { name: 'Clothing', items: [
      { id: 'c1', label: 'Light dresses / linen shirts' },
      { id: 'c2', label: 'One nice outfit for dinner' },
      { id: 'c5', label: 'All-white outfit (White Party night)' },
      { id: 'c3', label: 'Shorts x4' },
      { id: 'c4', label: 'Underwear + socks' },
    ]},
    { name: 'Toiletries', items: [
      { id: 't1', label: 'Toothbrush + toothpaste' },
      { id: 't2', label: 'Bug spray' },
      { id: 't3', label: 'Aloe vera / after-sun' },
      { id: 't4', label: 'Meds' },
    ]},
  ];

  var EXPLORE_SECTIONS = [
    { name: 'Beaches', color: '#14b8a6', items: [
      { title: 'Dickenson Bay', desc: 'Calm water, beach bars, easy to reach' },
      { title: 'Half Moon Bay', desc: 'Wilder Atlantic side, way less crowded' },
      { title: 'Darkwood Beach', desc: 'Best for sunset' },
    ]},
    { name: 'Food & Drink', color: '#ff6b6b', items: [
      { title: 'Fish Fry Friday', desc: 'Urlings village, every Friday night' },
      { title: 'English Harbour Rum', desc: 'The local spirit — worth a bottle home' },
      { title: 'Johnny cakes & saltfish', desc: 'Classic Antiguan breakfast, try it once' },
    ]},
    { name: 'Must-Do', color: '#ffc93c', items: [
      { title: 'Nelson’s Dockyard', desc: 'UNESCO site in English Harbour' },
      { title: 'Shirley Heights Sunset Party', desc: 'Steel band + panoramic views — all over Instagram at golden hour' },
      { title: 'Stingray City', desc: 'Swim with stingrays in shallow water — a TikTok favorite' },
      { title: 'Devil’s Bridge', desc: 'Natural limestone arch + blowholes, big photo spot' },
      { title: '365 beaches', desc: 'Locals say one for every day of the year' },
    ]},
    { name: 'Good to Know', color: 'rgba(31,41,55,0.5)', items: [
      { title: 'Currency', desc: 'EC dollar, but USD accepted almost everywhere' },
      { title: 'Tipping', desc: '10–15% at restaurants is standard' },
      { title: 'Driving', desc: 'Left side of the road, just like the UK' },
    ]},
  ];

  var FLIGHTS = [
    { name: 'Hali Pearce', legs: [
      { flight: 'American Eagle 3386', date: 'Aug 13', route: 'Pensacola (PNS) 6:05 AM → Miami (MIA) 8:55 AM' },
      { flight: 'American 2580', date: 'Aug 13', route: 'Miami (MIA) 10:05 AM → Antigua (ANU) 1:35 PM' },
      { flight: 'American 2394', date: 'Aug 16', route: 'Antigua (ANU) 2:36 PM → Miami (MIA) 6:03 PM' },
      { flight: 'American Eagle 4109', date: 'Aug 16', route: 'Miami (MIA) 10:58 PM → Pensacola (PNS) 11:50 PM' },
    ]},
    { name: 'Annie Zupon', legs: [
      { flight: 'American 3190', date: 'Aug 13', route: 'Atlanta (ATL) 7:13 AM → Miami (MIA) 9:14 AM', note: 'Short 51-min connection in MIA' },
      { flight: 'American 2580', date: 'Aug 13', route: 'Miami (MIA) 10:05 AM → Antigua (ANU) 1:35 PM' },
      { flight: 'American 3039', date: 'Aug 16', route: 'Antigua (ANU) 1:25 PM → Miami (MIA) 4:52 PM' },
      { flight: 'American', date: 'Aug 16', route: 'Miami (MIA) 7:45 PM → Atlanta (ATL) 9:56 PM' },
    ]},
    { name: 'Kay Muñoz', legs: [
      { flight: 'American 778', date: 'Aug 12–13', route: 'LAX 9:29 PM → 1 stop (MIA) → Antigua (ANU) 1:35 PM +1 day', note: 'Confirmation KSKATX' },
      { flight: 'American 2394', date: 'Aug 16', route: 'Antigua (ANU) 2:36 PM → 1 stop (MIA) → LAX 10:40 PM' },
    ]},
  ];

  var TRANSPORT_VOUCHER = './assets/transportation-voucher.pdf';
  var EXCURSION_VOUCHER = './assets/excursion-voucher.pdf';

  // ---------------------------------------------------------------------
  // Persistence
  // ---------------------------------------------------------------------

  var STORAGE_KEY = 'antigua-trip-app:v1';

  function loadState() {
    var defaults = { tab: 'trip', day: 0, packing: {}, customItems: [] };
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults;
      var parsed = JSON.parse(raw);
      return {
        tab: defaults.tab, // always start on the Trip tab
        day: currentDayIndex(),
        packing: (parsed && typeof parsed.packing === 'object' && parsed.packing) || {},
        customItems: (parsed && Array.isArray(parsed.customItems) && parsed.customItems) || [],
      };
    } catch (e) {
      return defaults;
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        packing: state.packing,
        customItems: state.customItems,
      }));
    } catch (e) { /* storage unavailable — state just won't survive reload */ }
  }

  // Default to whichever itinerary day is "today" once the trip starts.
  function currentDayIndex() {
    var today = new Date();
    var y = today.getFullYear(), m = today.getMonth(), d = today.getDate();
    var todayMidnight = new Date(y, m, d).getTime();
    var tripDates = [
      new Date(2026, 7, 13).getTime(),
      new Date(2026, 7, 14).getTime(),
      new Date(2026, 7, 15).getTime(),
      new Date(2026, 7, 16).getTime(),
    ];
    var idx = tripDates.indexOf(todayMidnight);
    return idx === -1 ? 0 : idx;
  }

  // ---------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------

  var state = loadState();

  function setState(patch) {
    Object.assign(state, patch);
    render();
  }

  function setTab(t) { setState({ tab: t }); }
  function setDay(i) { setState({ day: i }); }
  function toggleItem(id) {
    var packing = Object.assign({}, state.packing);
    packing[id] = !packing[id];
    state.packing = packing;
    persist();
    render();
  }
  function addItem(text) {
    text = (text || '').trim();
    if (!text) return;
    var id = 'x' + Date.now();
    state.customItems = state.customItems.concat([{ id: id, label: text }]);
    persist();
    render();
  }

  // ---------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function countdownText() {
    var now = new Date();
    var start = new Date(2026, 7, 13, 0, 0, 0);
    var diff = Math.ceil((start - now) / 86400000);
    if (diff > 0) return diff + ' day' + (diff === 1 ? '' : 's') + ' to go';
    if (diff === 0) return 'Today is the day!';
    return 'Trip in progress';
  }

  function icon(tab, color) {
    switch (tab) {
      case 'trip':
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C8 2 5 5.2 5 9.2c0 5.2 7 12.8 7 12.8s7-7.6 7-12.8C19 5.2 16 2 12 2z" stroke="' + color + '" stroke-width="2" fill="none"></path><circle cx="12" cy="9.2" r="2.4" stroke="' + color + '" stroke-width="2"></circle></svg>';
      case 'docs':
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="' + color + '" stroke-width="2"></rect><path d="M3 10h18M8 6V4h8v2" stroke="' + color + '" stroke-width="2"></path></svg>';
      case 'pack':
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="8" width="16" height="12" rx="2" stroke="' + color + '" stroke-width="2"></rect><path d="M9 8V6a3 3 0 016 0v2" stroke="' + color + '" stroke-width="2"></path></svg>';
      case 'explore':
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="' + color + '" stroke-width="2"></circle><path d="M15 9l-2 6-6 2 2-6z" stroke="' + color + '" stroke-width="1.6" stroke-linejoin="round"></path></svg>';
      case 'resort':
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 21V9l8-6 8 6v12" stroke="' + color + '" stroke-width="2" stroke-linejoin="round"></path><path d="M9 21v-6h6v6" stroke="' + color + '" stroke-width="2"></path></svg>';
    }
    return '';
  }

  // ---------------------------------------------------------------------
  // Screen renderers
  // ---------------------------------------------------------------------

  function renderTrip() {
    var weatherHtml = WEATHER.map(function (w) {
      return '<div class="weather-card">' +
        '<div class="wd">' + esc(w.d) + '</div>' +
        '<div class="icon" style="background:' + w.iconColor + ';"></div>' +
        '<div class="hi">' + w.hi + '°</div>' +
        '<div class="lo">' + w.lo + '°</div>' +
      '</div>';
    }).join('');

    var dayTabsHtml = ITINERARY.map(function (d, i) {
      var parts = d.date.split(' · '); // ["Wed", "Aug 13"]
      var label = parts[0] + ' ' + parts[1].split(' ')[1];
      var active = i === state.day;
      return '<button type="button" class="day-tab' + (active ? ' active' : '') + '" data-day="' + i + '">' +
        esc(label) +
      '</button>';
    }).join('');

    var itemsHtml = ITINERARY[state.day].items.map(function (it) {
      var color = TAG_COLOR[it.tag] || '#14b8a6';
      var bg = TAG_BG[it.tag] || 'rgba(20,184,166,0.12)';
      return '<div class="itin-item">' +
        '<div class="itin-dot-wrap" style="background:' + bg + ';"><div class="itin-dot" style="background:' + color + ';"></div></div>' +
        '<div style="flex:1;">' +
          '<div class="itin-time" style="color:' + color + ';">' + esc(it.time) + '</div>' +
          '<div class="itin-title">' + esc(it.title) + '</div>' +
          '<div class="itin-sub">' + esc(it.sub) + '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    return '' +
      '<div class="screen-header hd-trip">' +
        '<div class="hd-blob" style="top:-20px;right:-20px;width:100px;height:100px;"></div>' +
        '<div class="hd-blob" style="bottom:-30px;left:30px;width:70px;height:70px;"></div>' +
        '<div class="hd-title">Antigua!</div>' +
        '<div class="hd-sub">Aug 13–16, 2026 · Squad trip</div>' +
        '<div class="hd-badge">' + esc(countdownText()) + '</div>' +
      '</div>' +
      '<div class="weather-strip">' + weatherHtml + '</div>' +
      '<div class="weather-note">Forecast placeholder — will update closer to departure.</div>' +
      '<div class="day-tabs">' + dayTabsHtml + '</div>' +
      '<div class="itinerary">' + itemsHtml + '</div>';
  }

  function renderDocs() {
    var flightsHtml = FLIGHTS.map(function (trav) {
      var legsHtml = trav.legs.map(function (leg) {
        return '<div class="leg-row">' +
          '<div class="leg-bar" style="background:#ffa45c;"></div>' +
          '<div style="flex:1;">' +
            '<div class="leg-flight" style="color:#ffa45c;">' + esc(leg.flight) + ' · ' + esc(leg.date) + '</div>' +
            '<div class="leg-route">' + esc(leg.route) + '</div>' +
            (leg.note ? '<div class="leg-note">' + esc(leg.note) + '</div>' : '') +
          '</div>' +
        '</div>';
      }).join('');
      return '<div class="card">' +
        '<div class="card-eyebrow" style="color:#ffa45c;">Flights</div>' +
        '<div class="card-title">' + esc(trav.name) + '</div>' +
        '<div class="legs-col">' + legsHtml + '</div>' +
      '</div>';
    }).join('');

    var butlerHtml = BUTLER_TIPS.map(function (tip) {
      return '<div class="tip-row"><div class="tip-bar"></div><div class="tip-text">' + esc(tip) + '</div></div>';
    }).join('');

    return '' +
      '<div class="screen-header hd-docs">' +
        '<div class="hd-blob" style="top:-20px;right:-10px;width:90px;height:90px;"></div>' +
        '<div class="hd-title">Documents</div>' +
        '<div class="hd-sub">Confirmations & vouchers, all in one spot</div>' +
      '</div>' +

      '<div class="docs-list">' + flightsHtml + '</div>' +

      '<div class="docs-section"><div class="card">' +
        '<div class="card-row">' +
          '<div class="card-eyebrow" style="color:#14b8a6;">Hotel</div>' +
          '<div class="card-meta">3 nights</div>' +
        '</div>' +
        '<div class="card-title lg">Royalton Antigua</div>' +
        '<div class="card-desc">Autograph Collection · Butler Service Bay View, All-Inclusive Junior Suite</div>' +
        '<div class="info-grid">' +
          '<div><div class="info-label">Guests</div><div class="info-value">Hali Pearce + 2 (3 adults)</div></div>' +
          '<div><div class="info-label">Confirmation #</div><div class="info-value">96260910</div></div>' +
          '<div><div class="info-label">Check-in</div><div class="info-value">Aug 13, 2026</div></div>' +
          '<div><div class="info-label">Check-out</div><div class="info-value">Aug 16, 2026</div></div>' +
          '<div class="full"><div class="info-label">Total for stay</div><div class="info-value">$2,583.96 (all-inclusive, 3 nights)</div></div>' +
          '<div class="full"><div class="info-label">Address</div><div class="info-value">Deep Bay Street, St John’s, Antigua and Barbuda</div></div>' +
        '</div>' +
      '</div></div>' +

      '<div class="docs-section"><div class="card">' +
        '<div class="card-row">' +
          '<div class="card-eyebrow" style="color:#ffc93c;">Transportation</div>' +
          '<div class="card-meta">3 guests</div>' +
        '</div>' +
        '<div class="card-title">VIP Airport Transfer · NexusTours</div>' +
        '<div class="card-fine" style="margin-top:2px;">Booking 5RT4DV · charged to NexusTours</div>' +
        '<div class="legs-col">' +
          '<div class="leg-row"><div class="leg-bar" style="background:#ffc93c;"></div><div style="flex:1;">' +
            '<div class="leg-flight" style="color:#ffc93c;">Airport → Hotel</div>' +
            '<div class="leg-route">Pickup at Terminal Antigua after your 1:35 PM arrival → Royalton Antigua</div>' +
          '</div></div>' +
          '<div class="leg-row"><div class="leg-bar" style="background:#ffc93c;"></div><div style="flex:1;">' +
            '<div class="leg-flight" style="color:#ffc93c;">Hotel → Airport</div>' +
            '<div class="leg-route">Pickup at hotel 11:36 AM → Antigua Airport for flight AA2394, 2:36 PM departure</div>' +
          '</div></div>' +
        '</div>' +
        '<div class="card-note">Generate your Airport Transfer Pass via the Nexus App at least 48 hrs ahead — look for reps in orange shirts.</div>' +
        '<a href="' + TRANSPORT_VOUCHER + '" target="_blank" rel="noopener" class="card-link" style="background:#ffc93c;color:#7a5200;">View full voucher</a>' +
      '</div></div>' +

      '<div class="docs-section"><div class="card">' +
        '<div class="card-eyebrow" style="color:#a78bfa;">Butler Service</div>' +
        '<div class="card-title">Ways to make the most of it</div>' +
        '<div class="tips-col">' + butlerHtml + '</div>' +
      '</div></div>' +

      '<div class="docs-section" style="padding-bottom:24px;"><div class="card">' +
        '<div class="card-row">' +
          '<div class="card-eyebrow" style="color:#4caf82;">Excursion</div>' +
          '<div class="card-meta">3 adults</div>' +
        '</div>' +
        '<div class="card-title">Excellence Catamaran Cruise & Snorkel</div>' +
        '<div class="card-desc">With lunch & round-trip transportation</div>' +
        '<div class="card-fine">Reservation 4CGM5B · Fri, Aug 15 · 8:30 AM pickup at Royalton Antigua</div>' +
        '<div class="card-note">Includes: transport, drinks, meal, snorkel gear. Bring: swimsuit, sunblock, hat, cash for tips. Arrive 15 min early.</div>' +
        '<a href="' + EXCURSION_VOUCHER + '" target="_blank" rel="noopener" class="card-link" style="background:#4caf82;color:#ffffff;">View voucher</a>' +
      '</div></div>';
  }

  function renderSections(sections) {
    return sections.map(function (sec) {
      var itemsHtml = sec.items.map(function (tip) {
        return '<div class="tip-card">' +
          '<div class="tip-card-row">' +
            '<div class="tip-card-title">' + esc(tip.title) + '</div>' +
            (tip.badge ? '<div class="badge">' + esc(tip.badge) + '</div>' : '') +
          '</div>' +
          '<div class="tip-card-desc">' + esc(tip.desc) + '</div>' +
        '</div>';
      }).join('');
      return '<div>' +
        '<div class="section-name" style="color:' + sec.color + ';">' + esc(sec.name) + '</div>' +
        '<div class="section-items">' + itemsHtml + '</div>' +
      '</div>';
    }).join('');
  }

  function renderResort() {
    return '' +
      '<div class="screen-header hd-resort">' +
        '<div class="hd-blob" style="top:-20px;right:10px;width:90px;height:90px;"></div>' +
        '<div class="hd-title">Resort Guide</div>' +
        '<div class="hd-sub">Everything Royalton Antigua has on-site</div>' +
      '</div>' +
      '<div class="section-list">' + renderSections(RESORT_SECTIONS) + '</div>';
  }

  function renderExplore() {
    return '' +
      '<div class="screen-header hd-explore">' +
        '<div class="hd-blob" style="bottom:-30px;right:20px;width:90px;height:90px;"></div>' +
        '<div class="hd-title">Local Tips</div>' +
        '<div class="hd-sub">Beaches, food, and what not to miss</div>' +
      '</div>' +
      '<div class="section-list">' + renderSections(EXPLORE_SECTIONS) + '</div>';
  }

  function renderPack() {
    var allCats = PACK_CATEGORIES.slice();
    if (state.customItems.length) allCats.push({ name: 'Added by you', items: state.customItems });

    var packed = 0, total = 0;
    var catsHtml = allCats.map(function (cat) {
      var itemsHtml = cat.items.map(function (item) {
        var checked = !!state.packing[item.id];
        total++;
        if (checked) packed++;
        return '<div class="pack-item" data-toggle="' + esc(item.id) + '">' +
          '<div class="pack-checkbox' + (checked ? ' checked' : '') + '">' + (checked ? '✓' : '') + '</div>' +
          '<div class="pack-label' + (checked ? ' checked' : '') + '">' + esc(item.label) + '</div>' +
        '</div>';
      }).join('');
      return '<div>' +
        '<div class="pack-cat-name">' + esc(cat.name) + '</div>' +
        '<div class="pack-cat-list">' + itemsHtml + '</div>' +
      '</div>';
    }).join('');

    var pct = total ? Math.round((packed / total) * 100) : 0;

    return '' +
      '<div class="screen-header hd-pack">' +
        '<div class="hd-blob" style="top:-20px;right:0;width:90px;height:90px;"></div>' +
        '<div class="hd-title">Packing</div>' +
        '<div class="pack-progress">' +
          '<div class="pack-progress-track"><div class="pack-progress-fill" style="width:' + pct + '%;"></div></div>' +
          '<div class="pack-progress-count">' + packed + '/' + total + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="add-item-row">' +
        '<input id="new-item-input" class="add-item-input" type="text" placeholder="Add your own item…" value="' + esc(state.newItemText || '') + '">' +
        '<button type="button" id="add-item-btn" class="add-item-btn">+</button>' +
      '</div>' +
      '<div class="pack-categories">' + catsHtml + '</div>';
  }

  var SCREENS = { trip: renderTrip, docs: renderDocs, resort: renderResort, pack: renderPack, explore: renderExplore };
  var TAB_ORDER = ['trip', 'docs', 'pack', 'explore', 'resort'];
  var TAB_LABEL = { trip: 'Trip', docs: 'Docs', pack: 'Pack', explore: 'Explore', resort: 'Resort' };

  function renderTabBar() {
    return '<div class="tab-bar">' + TAB_ORDER.map(function (t) {
      var active = state.tab === t;
      var color = active ? TAB_COLOR[t] : INACTIVE;
      var bg = active ? TAB_BG[t] : 'transparent';
      return '<button type="button" class="tab-btn" data-tab="' + t + '" style="background:' + bg + ';">' +
        icon(t, color) +
        '<div class="tab-btn-label" style="color:' + color + ';">' + TAB_LABEL[t] + '</div>' +
      '</button>';
    }).join('') + '</div>';
  }

  // ---------------------------------------------------------------------
  // Render + event wiring
  // ---------------------------------------------------------------------

  var root = document.getElementById('app');
  var scrollTopByTab = {};

  function render() {
    var scrollEl = root.querySelector('.screen-scroll');
    if (scrollEl) scrollTopByTab[state.tab + '__prev'] = scrollEl.scrollTop;

    var screenHtml = SCREENS[state.tab]();
    root.innerHTML = '<div class="screen-scroll">' + screenHtml + '</div>' + renderTabBar();

    attachEvents();

    var newScrollEl = root.querySelector('.screen-scroll');
    if (newScrollEl) newScrollEl.scrollTop = scrollTopByTab[state.tab] || 0;
  }

  function attachEvents() {
    root.querySelectorAll('[data-tab]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var scrollEl = root.querySelector('.screen-scroll');
        if (scrollEl) scrollTopByTab[state.tab] = scrollEl.scrollTop;
        setTab(btn.getAttribute('data-tab'));
      });
    });

    root.querySelectorAll('[data-day]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setDay(parseInt(btn.getAttribute('data-day'), 10));
      });
    });

    root.querySelectorAll('[data-toggle]').forEach(function (row) {
      row.addEventListener('click', function () {
        toggleItem(row.getAttribute('data-toggle'));
      });
    });

    var input = document.getElementById('new-item-input');
    var addBtn = document.getElementById('add-item-btn');
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          addItem(input.value);
        }
      });
    }
    if (addBtn && input) {
      addBtn.addEventListener('click', function () {
        addItem(input.value);
      });
    }
  }

  render();

  // Keep the countdown/day-tabs fresh if the app is left open across midnight.
  setInterval(function () {
    if (state.tab === 'trip') render();
  }, 60 * 1000);
})();
