const mongoose = require('mongoose');
const Bootcamp = require('./models/Bootcamp');
require('dotenv').config();

const sampleBootcamps = [
  {
    title: 'Military Bootcamp Intensive',
    description: 'Experience authentic military training with our intensive bootcamp program. This challenging experience combines physical conditioning, mental toughness, and team coordination exercises designed to push you beyond your limits and discover strength you never knew you had.',
    price: 89,
    maxParticipants: 12,
    photos: [
      {
        url: '/uploads/bootcamps/military-1.jpg',
        alt: 'Military Bootcamp Training Session'
      }
    ],
    activityPlan: [
      {
        time: '08:00',
        activity: 'Formation and Briefing',
        description: 'Team formation, safety briefing, and objective setting for the day'
      },
      {
        time: '08:30',
        activity: 'Physical Conditioning',
        description: 'Military-style fitness drills and strength training exercises'
      },
      {
        time: '10:00',
        activity: 'Obstacle Course',
        description: 'Navigate challenging military-style obstacles and team challenges'
      },
      {
        time: '11:30',
        activity: 'Team Coordination',
        description: 'Strategic team-building and communication exercises'
      },
      {
        time: '13:00',
        activity: 'Lunch Break',
        description: 'Nutritious meal and rest period'
      },
      {
        time: '14:00',
        activity: 'Advanced Challenges',
        description: 'Complex problem-solving and endurance tests'
      },
      {
        time: '15:30',
        activity: 'Final Assessment',
        description: 'Skills demonstration and achievement ceremony'
      }
    ],
    category: 'military',
    duration: '8 hours',
    difficulty: 'advanced'
  },
  {
    title: 'Koh Lanta Survival Challenge',
    description: 'Test your survival skills and strategic thinking with our Koh Lanta-inspired adventure. Work in teams to overcome challenges, solve puzzles, and compete in exciting outdoor activities that mirror the famous reality show experience.',
    price: 65,
    maxParticipants: 16,
    photos: [
      {
        url: '/uploads/bootcamps/koh-lanta-1.jpg',
        alt: 'Koh Lanta Survival Challenge'
      }
    ],
    activityPlan: [
      {
        time: '09:00',
        activity: 'Tribe Formation',
        description: 'Team selection and strategy planning session'
      },
      {
        time: '09:30',
        activity: 'Fire Making Challenge',
        description: 'Traditional fire-starting techniques competition'
      },
      {
        time: '11:00',
        activity: 'Puzzle Solving',
        description: 'Complex team puzzles and mental challenges'
      },
      {
        time: '12:30',
        activity: 'Outdoor Cooking',
        description: 'Prepare lunch using survival cooking methods'
      },
      {
        time: '14:00',
        activity: 'Water Challenges',
        description: 'Swimming and water-based team activities'
      },
      {
        time: '15:30',
        activity: 'Final Tribal Council',
        description: 'Competition finale and winner ceremony'
      }
    ],
    category: 'koh-lanta',
    duration: '7 hours',
    difficulty: 'intermediate'
  },
  {
    title: 'Adventure Bootcamp Express',
    description: 'A high-energy adventure experience perfect for beginners and those short on time. Combines fitness, fun, and outdoor exploration in a compact but thrilling package that will leave you energized and accomplished.',
    price: 45,
    maxParticipants: 20,
    photos: [
      {
        url: '/uploads/bootcamps/adventure-1.jpg',
        alt: 'Adventure Bootcamp Express'
      }
    ],
    activityPlan: [
      {
        time: '10:00',
        activity: 'Warm-up & Introduction',
        description: 'Dynamic warm-up and activity introduction'
      },
      {
        time: '10:30',
        activity: 'Obstacle Circuit',
        description: 'Fun obstacle course with various challenges'
      },
      {
        time: '11:30',
        activity: 'Team Challenges',
        description: 'Collaborative problem-solving activities'
      },
      {
        time: '12:30',
        activity: 'Adventure Sports Taster',
        description: 'Introduction to various adventure sports'
      },
      {
        time: '13:30',
        activity: 'Cool Down & Celebration',
        description: 'Stretching, reflection, and achievement awards'
      }
    ],
    category: 'adventure',
    duration: '4 hours',
    difficulty: 'beginner'
  },
  {
    title: 'Corporate Team Building Bootcamp',
    description: 'Specially designed for corporate teams to enhance communication, leadership, and collaboration. Perfect for team retreats, company events, and professional development programs that strengthen workplace relationships.',
    price: 55,
    maxParticipants: 25,
    photos: [
      {
        url: '/uploads/bootcamps/team-building-1.jpg',
        alt: 'Corporate Team Building Bootcamp'
      }
    ],
    activityPlan: [
      {
        time: '09:00',
        activity: 'Icebreaker Activities',
        description: 'Fun activities to break down barriers and energize the team'
      },
      {
        time: '10:00',
        activity: 'Communication Challenges',
        description: 'Exercises focused on improving team communication'
      },
      {
        time: '11:30',
        activity: 'Leadership Rotation',
        description: 'Activities where different team members take leadership roles'
      },
      {
        time: '13:00',
        activity: 'Lunch & Networking',
        description: 'Shared meal and informal networking time'
      },
      {
        time: '14:00',
        activity: 'Problem-Solving Quest',
        description: 'Complex challenges requiring collaborative solutions'
      },
      {
        time: '15:30',
        activity: 'Reflection & Action Planning',
        description: 'Team reflection and planning for workplace implementation'
      }
    ],
    category: 'team-building',
    duration: '7 hours',
    difficulty: 'intermediate'
  },
  {
    title: 'Extreme Military Challenge',
    description: 'Our most demanding military-style bootcamp for experienced participants. This extreme challenge pushes physical and mental limits with advanced tactical exercises, endurance tests, and leadership scenarios.',
    price: 120,
    maxParticipants: 8,
    photos: [
      {
        url: '/uploads/bootcamps/extreme-military-1.jpg',
        alt: 'Extreme Military Challenge'
      }
    ],
    activityPlan: [
      {
        time: '07:00',
        activity: 'Pre-Dawn Assembly',
        description: 'Early morning briefing and equipment check'
      },
      {
        time: '07:30',
        activity: 'Endurance March',
        description: '5km tactical march with equipment'
      },
      {
        time: '09:00',
        activity: 'Combat Scenarios',
        description: 'Tactical problem-solving under pressure'
      },
      {
        time: '11:00',
        activity: 'Leadership Challenges',
        description: 'Command and control exercises'
      },
      {
        time: '13:00',
        activity: 'Field Rations',
        description: 'Military-style meal break'
      },
      {
        time: '14:00',
        activity: 'Advanced Obstacles',
        description: 'Elite-level obstacle course challenges'
      },
      {
        time: '16:00',
        activity: 'Final Mission',
        description: 'Culminating team mission and debrief'
      }
    ],
    category: 'military',
    duration: '10 hours',
    difficulty: 'advanced'
  },
  {
    title: 'Family Adventure Day',
    description: 'A fun-filled adventure bootcamp designed for families with children aged 8+. Combines age-appropriate challenges, team activities, and outdoor fun that brings families closer together through shared adventure.',
    price: 35,
    maxParticipants: 30,
    photos: [
      {
        url: '/uploads/bootcamps/family-adventure-1.jpg',
        alt: 'Family Adventure Day'
      }
    ],
    activityPlan: [
      {
        time: '10:00',
        activity: 'Family Teams Formation',
        description: 'Family grouping and fun introductions'
      },
      {
        time: '10:30',
        activity: 'Treasure Hunt',
        description: 'Family-friendly treasure hunting adventure'
      },
      {
        time: '12:00',
        activity: 'Picnic Lunch',
        description: 'Outdoor family picnic and rest time'
      },
      {
        time: '13:00',
        activity: 'Mini Obstacles',
        description: 'Age-appropriate obstacle course for all'
      },
      {
        time: '14:30',
        activity: 'Family Challenges',
        description: 'Collaborative family team challenges'
      },
      {
        time: '15:30',
        activity: 'Celebration & Awards',
        description: 'Family photos and participation certificates'
      }
    ],
    category: 'adventure',
    duration: '6 hours',
    difficulty: 'beginner'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ohplay');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Bootcamp.deleteMany({});
    console.log('🧹 Cleared existing bootcamps');

    // Insert sample data
    const insertedBootcamps = await Bootcamp.insertMany(sampleBootcamps);
    console.log(`🌱 Inserted ${insertedBootcamps.length} sample bootcamps`);

    // Log the created bootcamps
    insertedBootcamps.forEach(bootcamp => {
      console.log(`   ✓ ${bootcamp.title} (${bootcamp.category})`);
    });

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleBootcamps };