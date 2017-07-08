//
//  EnumsAndStructs.swift
//  DALISwift
//
//  Created by John Kotz on 7/5/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation
import SCLAlertView

let env = NSDictionary(contentsOfFile: Bundle.main.path(forResource: "PrivateInformation", ofType: "plist")!)! as! [String: Any]

extension Notification.Name {
	enum Custom {
		static let LocationUpdated = Notification.Name(rawValue: "LocationUpdated")
		static let CheckInComeplte  =  Notification.Name(rawValue: "CheckInComeplte")
		static let EnteredOrExitedDALI = Notification.Name(rawValue: "EnteredOrExitedDALI")
		static let CheckInEnteredOrExited = Notification.Name(rawValue: "CheckInEnteredOrExited")
		static let EventVoteEnteredOrExited = Notification.Name(rawValue: "EventVoteEnteredOrExited")
		static let TimsOfficeEnteredOrExited = Notification.Name(rawValue: "TimsOfficeEnteredOrExited")
	}
}

struct SharedUser {
	let email: String
	let name: String
}

struct Recurrence {
	enum Frequency: String {
		case weekly
		case daily
	}
	let frequency: Frequency
	let interval: Int?
	let periodData: [Int]?
	let rrule: String
	let until: Date?
}

struct Event {
	let name: String
	let location: String
	let description: String
	let googleID: String
	let recurrence: Recurrence?
	let id: String
	let startTime: Date
	let endTime: Date
}

func userIsTim(user: GIDGoogleUser) -> Bool {
	return (env["tim"] as! String) == user.profile.email
}

func userIsAdmin(user: GIDGoogleUser) -> Bool {
	return (env["admins"] as! [String]).contains(user.profile.email)
}

var apiPrivateKey: String {
	return (env["secure-keys"] as! [String:String])["dali-api"]!
}

var serverPrivateKey: String {
	return (env["secure-keys"] as! [String:String])["dali-app-server"]!
}

protocol AlertShower {
	func showAlert(alert: SCLAlertView, title: String, subTitle: String, color: UIColor, image: UIImage)
}