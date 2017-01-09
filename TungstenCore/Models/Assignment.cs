using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TungstenCore.Models
{
    public class Assignment : Entity<string>
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required, ForeignKey("Segment")]
        public string SegmentId { get; set; }
        public virtual Segment Segment { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime EndTime { get; set; }
    }
}