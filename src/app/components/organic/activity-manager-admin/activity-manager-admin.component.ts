import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface ActivityTag {
  label: string;
  active: boolean;
}

interface ActivityBar {
  height: number;
  active: boolean;
}

interface BusinessPlan {
  name: string;
  iconBg: string;
  hasDropdown: boolean;
  option?: string;
}

@Component({
  selector: 'app-activity-manager-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './activity-manager-admin.component.html',
  styleUrl: './activity-manager-admin.component.css'
})
export class ActivityManagerAdminComponent {
    activityTags: ActivityTag[] = [
    { label: 'Team',     active: true  },
    { label: 'Insights', active: true  },
    { label: 'Today',    active: true  },
  ];

  activityAmount = 43.20;

  activityBars: ActivityBar[] = [
    { height: 14, active: false },
    { height: 22, active: false },
    { height: 10, active: false },
    { height: 32, active: true  },
    { height: 18, active: false },
    { height: 26, active: true  },
    { height: 12, active: false },
    { height: 28, active: false },
    { height: 16, active: true  },
    { height: 20, active: false },
    { height: 35, active: false },
    { height: 24, active: false },
  ];

  activityDots: number[] = [0, 1, 2, 3, 4];
  activeActivityDot = 1;

  businessPlans: BusinessPlan[] = [
    { name: 'Bank loans',     iconBg: 'bg-coral',    hasDropdown: true,  option: 'Bank loans' },
    { name: 'Accounting',     iconBg: 'bg-gray-400', hasDropdown: false },
    { name: 'HR management',  iconBg: 'bg-gray-300', hasDropdown: false },
  ];

    removeTag(tag: ActivityTag): void {
    tag.active = false;
    this.activityTags = this.activityTags.filter(t => t.active);
  }

  selectActivityBar(index: number): void {
    this.activityBars = this.activityBars.map((b, i) => ({
      ...b,
      active: i === index,
    }));
  }
}
