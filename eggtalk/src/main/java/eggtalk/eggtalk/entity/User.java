package eggtalk.eggtalk.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

   @JsonIgnore
   @Id
   @Column(name = "id")
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(name = "user_id", length = 50, unique = true)
   private String userId;

   @JsonIgnore
   @Column(name = "password", length = 100)
   private String password;

   @Column(name = "username", length = 50)
   private String username;

   @Column(name = "gender", length = 2)
   private Integer gender;

   @Column(name = "email", length = 50)
   private String email;

   @JsonIgnore
   @Column(name = "activated")
   private boolean activated;

   @ManyToMany
   @JoinTable(
      name = "user_authority",
      joinColumns = {@JoinColumn(name = "id", referencedColumnName = "id")},
      inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
   private Set<Authority> authorities;
}