import { Component } from '@angular/core';
import { HomeNavComponent } from "./components/home-nav/home-nav.component";
import { HeroSectionComponent } from "./components/hero-section/hero-section.component";
import { DiscoverSectionComponent } from "./components/discover-section/discover-section.component";
import { EssentialFeaturesComponent } from "./components/essential-features/essential-features.component";
import { WhyChoooseUsComponent } from "./components/why-chooose-us/why-chooose-us.component";
import { FAQComponent } from "./components/faq/faq.component";
import { HomeFooterComponent } from "./components/home-footer/home-footer.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HomeNavComponent, HeroSectionComponent, DiscoverSectionComponent, EssentialFeaturesComponent, WhyChoooseUsComponent, FAQComponent, HomeFooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
