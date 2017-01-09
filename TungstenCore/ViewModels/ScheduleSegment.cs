using System;

namespace TungstenCore.ViewModels
{
    /// <summary>
    /// Viewmodel for client-side schedule rendering
    /// </summary>
    public class ScheduleSegment
    {
        public string CourseName { get; set; }
        public DayOfWeek Day { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Classroom { get; set; }
        public string Color { get; set; }
    }
}
