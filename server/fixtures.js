if (Employees.find().count() === 0) {
  var employees = [
    {name:"Michelle Baillargeon",title:"Schedule Coordinator",email:"mbaillargeon@centurytradeshow.com",company:"orlando"},
    {name:"Christine Hayward",title:"Sales & Marketing Manager",email:"chayward@centurytradeshow.com",company:"orlando"},
    {name:"Daniel Campos",title:"Regional Vice President of Operations, East",email:"dcampos@centurytradeshow.com",company:"orlando"},
    {name:"Marty Stein",title:"CFO",email:"mstein@centurytradeshow.com",company:"orlando"},
    {name:"Hiram Ramirez",title:"Operations Manager",email:"hramirez@centurytradeshow.com",company:"orlando"},
    {name:"Vanessa Fulmore",title:"Schedule Coordinator",email:"vfulmore@centurytradeshow.com",company:"orlando"},
    {name:"Tristan Wong",title:"Operations Manager",email:"twong@centurytradeshow.com",company:"orlando"},
    {name:"Inelsi Rivera",title:"Sales",email:"sales@centurytradeshow.com",company:"orlando"},
    {name:"Mel Mueller",title:"Vice President",email:"mmueller@centurytradeshow.com",company:"orlando"},
    {name:"Angie Victorino",title:"Schedule Coordinator",email:"avictorino@centurytradeshow.com",company:"vegas"},
    {name:"Kim Tay",title:"Regional Vice President of Operations, West",email:"ktay@centurytradeshow.com",company:"vegas"},
    {name:"Kristine Parentela",title:"Schedule Cooridinator",email:"kparentela@centurytradeshow.com",company:"vegas"},
    {name:"Mike Callaghan",title:"President",email:"mcallaghan@centurytradeshow.com",company:"vegas"},
    {name:"Sean Tay",title:"Sales Manager",email:"stay@centurytradeshow.com",company:"vegas"},
    {name:"Ariana Sherman",title:"Compliance Coordinator",email:"asherman@centurytradeshow.com",company:"vegas"},
    {name:"Brian Nagunst",title:"Operations Manager",email:"bnagunst@centurytradeshow.com",company:"vegas"},
  ];
  _.each(employees, function(employee) {
    Employees.insert(employee);
  });
}

if (Services.find().count() === 0) {
  var services = [
    {name:"qualifications",description:"Consulting team, full building security, booth security, armed security, executive protection, and video surveillance.",type:"security"},
    {name:"licensing",description:"Century Security & Event Staffing, Inc. complies with all security licensing requirements stipulated by the state. These licenses are monitored and checked before every event. Century only hires individuals who have met all of the fundamental requirements, as well as our own interview criteria.",type:"security"},
    {name:"communications",description:"Century owns 240 Motorola HT1250-LS radios that we use for on-site communication. All of our show-site supervisory personnel are also equipped with Nextel radios to communicate with our staff, show management, and other contractors.",type:"security"},
    {name:"video surveillance",description:"Century owns 45 portable video surveillance systems, with 280 individual cameras. The cameras transfer video over Ethernet and are powered from that single Ethernet line. These units are self-contained, and include one DVR with a 24 hour recording cycle and 1 terabyte of memory. The systems are internet capable for remote monitoring.",type:"security"},
    {name:"consulting",description:"Century travels with many different events every year. These events are held in almost every popular tradeshow destination, so our management team is familiar with nearly all major convention centers in the country! Century provides on-site management to handle and oversee all security needs of the event so that you don’t have to worry about a thing.",type:"security"},
    {name:"security specialists",description:"We know some events/areas are more important than others. As an alternative to standard security guards, Century offers personnel that have previous Law Enforcement experience and training. Century Security uses Security Specialists in these key areas to ensure your event runs smoothly, a service which distinguishes us from other providers.",type:"security"},
    {name:"executive protection",description:"Century understands the extensive planning and flawless execution necessary to protect a dignitary, celebrity, or other high-profile persons without smothering or drawing attention to the client. We also offer a selection of transportation vehicles for you to choose from.",type:"security"},
    {name:"camera patrol",description:"Many events are private, industry exclusive events attended by those with invitations only. Century offers a camera patrol service to eliminate any worry about any unauthorized photography or video footage during your event.",type:"security"},
    {name:"uniforms",description:"All Century Security Staff are professionally uniformed. Our uniforms consist of a black blazer with a Century Security emblem, a white security shirt, a black tie, black pants, and a Century issued ID badge.",type:"security"},
    {name:"qualifications",description:"Century Staff services include but are are not limited to: registration assistants, lead retrieval, typists, badge pullers, information desk personnel, ticket takers, room/session monitors, show office managers, host/hostess, show floor runners, floor manager assistants, directional, bilingual staff, and fulfillment staff.",type:"staffing"},
    {name:"uniform",description:"Century offers a variety of uniform / dress options. Century staff can be easily identified dressed in our yellow polo with company logo, black slacks, lanyards and photo ID name badge. For a more formal look, staff can wear maroon blazers with white button down shirts and black slacks. Our conference assistants can also be dressed in business professional, business casual, or your conference attire.",type:"staffing"},
    {name:"overtime",description:"Century Event Staffing complies with all labors laws in the cities and states in which we operate. We schedule the same staff through the entire event; therefore, they only need to be trained once and are familiar with the expectation and the event itself.",type:"staffing"},
    {name:"registration assistants",description:"Registration is often the first line of contact an attendee has with your event on-site. Our event registration staff is computer knowledgeable and customer service oriented, ready to make a positive impact on each attendee with a great attitude and a smile!",type:"staffing"},
    {name:"room/session monitors",description:"Our room/session monitors will keep your sessions running smoothly. Room monitors are trained to assist with distributing meeting materials, taking a head-count, ensuring that attendees are at the correct sessions and any other duties you may require.",type:"staffing"},
    {name:"directional/information desk staff",description:"Our knowledgeable staff will assist your attendees with general event and venue information, as well as offering guidance on local attractions and dining options.",type:"staffing"},
    {name:"fulfillment",description:"Century has experienced staff for your fulfillment needs. For instance, let Century take the shipping logistics off your hands… We will be happy to receive your shipments at our warehouse for advance fulfillment and deliver completed materials to show site.",type:"staffing"},
    {name:"press/speaker room assistants",description:"Your speakers and media attendees are an integral to the success of your event. Our staff will provide a high level of professional customer service to these VIPs, assisting them by answering phones, taking messages, operating basic office equipment and providing event information and directions as needed.",type:"staffing"},
    {name:"booth host/hostess/model",description:"Let us help increase traffic to your booth! Our booth assistants are experienced in providing customer service to attendees that come into your booth by greeting them, collecting business cards, handing out promotional materials, etc.",type:"staffing"},
  ]
  _.each(services, function(service) {
    Services.insert(service);
  });
}
